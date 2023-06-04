SET "PYTHONPATH=%cd%"
echo %PYTHONPATH%

CALL python backend/websockets/websocket_device_finder.py
@REM START python backend/websockets/websocket_device_group.py
@REM START python backend/websockets/websocket_device_setter.py
@REM START python backend/websockets/websocket_redis_query.py
@REM START python backend/websockets/websocket_response_bind.py
