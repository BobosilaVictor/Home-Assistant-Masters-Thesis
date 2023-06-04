import { Button, Group, Text } from "@mantine/core";
import { EnumFeature, NumericFeaturePreset } from "../../../../models";
import { useContext } from "react";
import { SocketContext } from "../../../../App";

interface DeviceExposesProps {
  exposes: EnumFeature;
  property:string,
  state: any;
}
const EnumContent = ({ exposes, property, state }: DeviceExposesProps) => {
  const current_device_name = window.location.pathname.split("/")[2];
  const socket = useContext(SocketContext);
  const send_data = (value: unknown) => {
    const message =
      exposes.name +
      " " +
      current_device_name +
      " " +
      property +
      " " +
      value;
    if (socket && socket.readyState == socket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };
  {
    const buttons = exposes.values.map((value) => {
      const value_formated = value as string;
      return (
        <Button
          sx={(theme) => ({
            backgroundColor:
              theme.colors.dark[theme.colorScheme === "dark" ? 4 : 9],
            color: "#fff",
            "&:hover": {
              backgroundColor:
                theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
            },
          })}
          onClick={()=>send_data(value)}
        >
          {value_formated}
        </Button>
      );
    });

    return (
      <div>
        <Text sx={{ padding: 10 }}>{exposes.name.toUpperCase()}: </Text>
        <Group position="center" sx={{ padding: 10 }}>
          {buttons}
        </Group>
      </div>
    );
  }
};

export default EnumContent;
