#!/usr/bin/env python
from backend.helpers.redis_device_getter import RedisGetter
import json
import asyncio
import websockets


async def handler(websocket):
    async for message in websocket:
        if message == "machinelearning":
            data = RedisGetter(message, "placeholder").get_ml_data()
        else:
            device_name = message.split()[0]
            property = message.split()[1]
            resample_value = message.split()[2]
            data = RedisGetter(device_name, property).parse_range_data(resample_value)

            await websocket.send(json.dumps(data))


async def main():
    async with websockets.serve(handler, "192.168.100.152", 8002):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
