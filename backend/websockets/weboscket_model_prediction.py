#!/usr/bin/env python
from backend.helpers.model_predictor import ModelPredictor
import json
import asyncio
import websockets
import time


async def handler(websocket):
    async for message in websocket:
        device_name = message.split()[0]
        property = message.split()[1][:-1]
        data = ModelPredictor(device_name, property).make_prediction()

        await websocket.send(json.dumps(data))
        time.sleep(60 * 10)


async def main():
    async with websockets.serve(handler, "192.168.100.152", 8003):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
