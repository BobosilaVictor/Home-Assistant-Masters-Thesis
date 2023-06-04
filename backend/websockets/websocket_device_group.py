#!/usr/bin/env python

from backend.helpers.device_group_finder import DeviceGroupFinder

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
    groups = DeviceGroupFinder()
    while True:
        await asyncio.sleep(1)
        if groups.data:
            websockets.broadcast(CONNECTIONS, json.dumps(groups.data))


async def main():
    async with websockets.serve(register, "192.168.100.149", 5680):
        await send_data()


if __name__ == "__main__":
    asyncio.run(main())
