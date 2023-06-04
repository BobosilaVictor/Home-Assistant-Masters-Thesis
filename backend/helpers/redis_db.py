import redis
import datetime
import time

r = redis.Redis(
    host="192.168.100.152",
    port=6379,
)


def store_data(data):
    for device in data:
        if "status" in device:
            status = device["status"]
            date = datetime.datetime.now()
            timestamp = int(date.timestamp() * 1000)
            pipe = r.pipeline()
            device_entry(device, timestamp, pipe, status)


def device_entry(device, timestamp, pipe, status):
    for key in status.keys():
        print(key)
        if check_if_list(status[key]):
            continue
        if check_if_status_is_update(status[key]):
            continue
        status_int = integerize_strings(status[key])
        if check_if_unwanted_string(status[key]):
            continue
        pipe.execute_command(
            "ts.add", f"ts:{device['friendly_name']}:{key}", timestamp, status_int
        )
        pipe.execute()


def check_if_status_is_update(status):
    print(type(status))
    if isinstance(status, dict):
        return True
    else:
        return False


def check_if_unwanted_string(status):
    if isinstance(status, str):
        return True
    else:
        return False


def check_if_list(status):
    if isinstance(status, list):
        return True
    else:
        return False


def integerize_bools(status):
    if status == True:
        return 1
    elif status == False:
        return 0
    else:
        return status


def integerize_strings(status):
    status = integerize_bools(status)
    if status == "on":
        return 1
    elif status == "off":
        return 0
    else:
        return status
