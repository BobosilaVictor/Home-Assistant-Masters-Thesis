SET "PYTHONPATH=%cd%"
echo %PYTHONPATH%

START python backend/websockets/websocket_device_finder.py
START python backend/websockets/websocket_device_group.py
START python backend/websockets/websocket_device_setter.py
START python backend/websockets/websocket_redis_query.py
START python backend/websockets/websocket_response_bind.py
