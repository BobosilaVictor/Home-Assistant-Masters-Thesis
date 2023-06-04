#!/usr/bin/env python

import asyncio
import websockets
import json

from backend.helpers.device_response_bind import DeviceBind
from backend.helpers.device_response_unbind import DeviceUnBind

CONNECTIONS = set()


async def register(websocket):
    CONNECTIONS.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        CONNECTIONS.remove(websocket)


async def send_data():
    bind = DeviceBind()
    unbind = DeviceUnBind()
    while True:
        await asyncio.sleep(1)
        if bind.data or unbind.data:
            websockets.broadcast(CONNECTIONS, json.dumps([bind.data, unbind.data]))
            bind.data = {"status": None}
            unbind.data = {"status": None}


async def main():
    async with websockets.serve(register, "192.168.100.149", 5679):
        await send_data()


if __name__ == "__main__":
    asyncio.run(main())
