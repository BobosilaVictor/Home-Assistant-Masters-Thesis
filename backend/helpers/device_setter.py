import paho.mqtt.client as mqtt
import json


# from .models import ZigbeeDevice
class DeviceSetter(object):
    def __init__(self):
        try:
            self.status = None
            self.BROKER_IP = "192.168.100.152"
            self.client = mqtt.Client("P3")

            self.client.connect(self.BROKER_IP, 1883, 60)

            self.client.loop_start()

        except Exception as e:
            print(e)

    def on_publish_setter(self, client, userdata, mid):
        print("Message has been published")
        self.client.disconnect()

    def publishCustom(self, device, topic_raw, message):
        self.client.publish(f"zigbee2mqtt/{device}/set/{topic_raw}", message[:-1])
        print(f"zigbee2mqtt/{device}/set/{topic_raw}", message[:-1])

    def publishCustomGroup(self, topic, group, device):
        message_sent = {"group": group, "device": device}
        # MQTT only acknowledges strings, ints, floats, or bytes as messages, so we have to convert the dictionary
        # to a string
        message_sent_string = json.dumps(message_sent)
        self.client.publish(
            f"zigbee2mqtt/bridge/request/group/members/{topic}", message_sent_string
        )

    def publishCustomBind(self, source_device, target_device, choice):
        message_sent = {"from": source_device, "to": target_device}

        message_sent_string = json.dumps(message_sent)
        print(f"zigbee2mqtt/bridge/request/device/{choice}")
        self.client.publish(
            f"zigbee2mqtt/bridge/request/device/{choice}", message_sent_string
        )

    def publishCustomNewGroup(self, topic_raw, message):
        message_sent = {
            "friendly_name": message,
        }
        # MQTT only acknowledges strings, ints, floats, or bytes as messages, so we have to convert the dictionary
        # to a string
        message_sent_string = json.dumps(message_sent)
        self.client.publish(
            f"zigbee2mqtt/bridge/request/group/{topic_raw}", message_sent_string
        )
        
    def publishCustomDeleteGroup(self, topic_raw, message):
        message_sent = {
            "id": message,
        }
        # MQTT only acknowledges strings, ints, floats, or bytes as messages, so we have to convert the dictionary
        # to a string
        message_sent_string = json.dumps(message_sent)
        self.client.publish(
            f"zigbee2mqtt/bridge/request/group/{topic_raw}", message_sent_string
        )


    def publishRename(self, device_to_change, message):
        message_sent = {"from": str(device_to_change), "to": message}
        # MQTT only acknowledges strings, ints, floats, or bytes as messages, so we have to convert the dictionary
        # to a string
        message_sent_string = json.dumps(message_sent)
        self.client.publish(
            "zigbee2mqtt/bridge/request/device/rename", message_sent_string
        )

    def publishGroupSet(self, topic_raw, message):
        topic = topic_raw.split("/")[0]
        group_name = topic_raw.split("/")[1]
        message_sent = {
            "state": message,
        }
        # MQTT only acknowledges strings, ints, floats, or bytes as messages, so we have to convert the dictionary
        # to a string
        message_sent_string = json.dumps(message_sent)
        self.client.publish(f"zigbee2mqtt/{group_name}/{topic}", message_sent_string)
