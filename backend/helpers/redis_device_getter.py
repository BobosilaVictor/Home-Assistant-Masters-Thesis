import redis
import datetime
import pandas as pd


class RedisGetter:
    def __init__(self, device_name, property_name):
        self.device_name = device_name
        self.property_name = property_name
        self.connect_to_db()

        self.key = f"ts:{self.device_name[1:]}:{self.property_name}"

    def connect_to_db(self):
        self.r = redis.Redis(
            host="192.168.100.152",
            port=6379,
        )

    def get_parameter_info_ts_range(self):
        # message = self.r.info()
        ts = self.r.ts()
        print(self.key)
        info = ts.info(self.key)
        return (info.first_timestamp, info.last_timestamp)

    def get_data_in_range(self):
        range = self.get_parameter_info_ts_range()

        data = self.r.ts()
        range_data = data.range(self.key, range[0], range[1])
        return range_data

    def parse_range_data(self, resample_value="10T"):
        range_data = self.get_data_in_range()
        ts, param = zip(*range_data)
        ts = list(ts)
        param = list(param)

        ts_string = [
            datetime.datetime.fromtimestamp(int(ts / 1000)).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            for ts in ts
        ]
        ts_date = [
            datetime.datetime.strptime(ts, "%Y-%m-%d %H:%M:%S") for ts in ts_string
        ]
        # print(ts_date)
        device_data = pd.DataFrame({"Date": ts_date, self.property_name: param})
        device_data["Date"] = pd.to_datetime(device_data["Date"])
        device_data = (
            device_data.set_index("Date")
            .resample(rule=resample_value[:-1])
            .bfill()
        )
        # to make json more readable we reset_index to str
        device_data["Date"] = device_data.index
        device_data["Date"] = device_data["Date"].dt.strftime("%Y-%m-%d %H:%M:%S")

        device_data = device_data.set_index("Date")
        return device_data.to_json()
