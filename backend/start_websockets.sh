export PYTHONPATH=$PWD


python3 backend/websockets/websocket_device_finder.py &
python3 backend/websockets/websocket_device_group.py &
python3 backend/websockets/websocket_device_setter.py &
python3 backend/websockets/websocket_redis_query.py &
python3 backend/websockets/websocket_response_bind.py 
    