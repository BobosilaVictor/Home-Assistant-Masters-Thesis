#!/usr/bin/env python
from backend.helpers.model_predictor import ModelPredictor
import json
import asyncio
import websockets
import time

CONNECTIONS = set()


async def register(websocket):
    CONNECTIONS.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        CONNECTIONS.remove(websocket)


async def send_data():
    while True:
        data = ModelPredictor("0x00124b0029192503", "temperature").make_prediction()
        await asyncio.sleep(1)
        websockets.broadcast(CONNECTIONS, json.dumps(data))


async def main():
    async with websockets.serve(register, "192.168.100.152", 8003):
        await send_data()


if __name__ == "__main__":
    asyncio.run(main())
