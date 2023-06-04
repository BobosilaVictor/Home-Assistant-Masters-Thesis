import paho.mqtt.client as mqtt

from queue import Queue
import json


class DeviceGroupFinder(object):
    def __init__(self):
        try:
            self.data = {}
            self.BROKER_IP = "192.168.100.152"
            self.client = mqtt.Client("P21")
            self.client.on_connect = self.on_connect_finder
            self.client.on_message = self.on_message_finder
            self.client.connect(self.BROKER_IP, 1883, 60)
            self.client.loop_start()

        except Exception as e:
            print(e)

    def on_connect_finder(self, client, userdata, flags, rc):
        self.client.subscribe("zigbee2mqtt/bridge/groups")
        print("connected! groups")

    def on_message_finder(self, client, userdata, message):
        # global messages
        # Start creating the json format with {devices:[]}
        q = Queue()
        first = '{"group":'
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

        self.data = self.data['group']
