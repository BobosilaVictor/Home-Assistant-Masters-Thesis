import { Box, Slider, Text } from "@mantine/core";
import { NumericFeature } from "../../models";
import { useContext, useState } from "react";
import { SocketContext } from "../../App";

interface FeatureProps {
  feature: NumericFeature;
  state: any;
}
const SliderContent = ({ feature, state }: FeatureProps) => {
  const current_device_name = window.location.pathname.split("/")[2];
  const [value, setValue] = useState(state[feature.property]);

  const socket = useContext(SocketContext);
  const send_data = (endValue: number) => {
    const message =
      feature.name +
      " " +
      current_device_name +
      " " +
      feature.property +
      " " +
      endValue;
    if (socket && socket.readyState == socket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <Box maw={400} mx="auto">
      <Slider
        min={feature.value_min}
        max={feature.value_max}
        value={value}
        onChange={setValue}
        onChangeEnd={send_data}
      />
      <Text mt="md" size="sm">
        Set value to: <b>{value}</b>
      </Text>
    </Box>
  );
};

export default SliderContent;
