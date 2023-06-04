#!/usr/bin/env python
from  backend.helpers.device_setter import DeviceSetter

import asyncio
import websockets


async def handler(websocket):
    async for message in websocket:
        if len(message.split()) == 3:
            print(message.split()[1], message.split()[0][1:], message.split()[2])
            DeviceSetter().publishCustomBind(
                message.split()[1], message.split()[0][1:], message.split()[2][:-1]
            )
        else:
            DeviceSetter().publishCustom(
                message.split()[1], message.split()[2], message.split()[3]
            )


async def main():
    async with websockets.serve(handler, "localhost", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
