import paho.mqtt.client as mqtt

from queue import Queue
import json


class DeviceBind(object):
    def __init__(self):
        try:
            self.data = {"status": None}
            self.BROKER_IP = "192.168.100.149"
            self.client = mqtt.Client("P4")
            self.client.on_connect = self.on_connect_finder
            self.client.on_message = self.on_message_finder
            self.client.connect(self.BROKER_IP, 1883, 60)
            self.client.loop_start()

        except Exception as e:
            print(e)

    def on_connect_finder(self, client, userdata, flags, rc):
        self.client.subscribe("zigbee2mqtt/bridge/response/device/bind")
        print("connected! response")

    def on_message_finder(self, client, userdata, message):
        # global messages
        # Start creating the json format with {devices:[]}
        q = Queue()
        first = '{"devices":'
        last = "}"
        # Get the payload and save it
        payload = str(message.payload.decode("utf-8"))
        # Build the payload to have a json format so its easier to access
        payload = first + payload + last
        # Save the payload so we can work with it
        q.put(payload)

        while not q.empty():
            message = q.get()
            self.data = json.loads(message)

        print(self.data)
        self.data = self.parse_data()

    def parse_data(self):
        if self.data["devices"]["status"] == "ok":
            return f"Binding successful for: {self.data['devices']['data']['clusters']}"
        elif self.data["devices"]["status"] == "error":
            return f"Error! {self.data['devices']['error']}"
