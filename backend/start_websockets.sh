export PYTHONPATH=$PWD


python backend/websockets/websocket_device_finder.py &
python backend/websockets/websocket_device_group.py &
python backend/websockets/websocket_device_setter.py &
python backend/websockets/websocket_redis_query.py &
python backend/websockets/websocket_response_bind.py 
