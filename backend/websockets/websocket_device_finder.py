#!/usr/bin/env python

from backend.helpers.device_status import DeviceState
from backend.helpers.device_finder import DeviceFinder
from backend.helpers.redis_db import store_data
import asyncio
import websockets
import json

CONNECTIONS = set()


async def register(websocket):
    CONNECTIONS.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        CONNECTIONS.remove(websocket)


async def send_data():
    devices = DeviceFinder()
    while True:
        await asyncio.sleep(1)
        if devices.data:
            store_data(devices.data)
            states = DeviceState(devices.data)
            websockets.broadcast(CONNECTIONS, json.dumps(states.data))


async def main():
    async with websockets.serve(register, "192.168.100.149", 5678):
        await send_data()


if __name__ == "__main__":
    asyncio.run(main())
