import { Button, Group } from "@mantine/core";
import { NumericFeaturePreset } from "../../../../models";
import { useContext, useState } from "react";
import { SocketContext } from "../../../../App";

interface DeviceExposesProps {
  exposes: NumericFeaturePreset[] | undefined;
  property: string;
  state: any;
}
const NumericPresetContent = ({
  exposes,
  property,
  state,
}: DeviceExposesProps) => {
  const current_device_name = window.location.pathname.split("/")[2];
  const socket = useContext(SocketContext);
  const send_data = (preset: NumericFeaturePreset) => {
    const message =
      preset.name +
      " " +
      current_device_name +
      " " +
      property +
      " " +
      preset.value;
    if (socket && socket.readyState == socket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };
  {
    let buttons = undefined;
    if (exposes != undefined) {
      buttons = exposes.map((preset) => {
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
            onClick={() => send_data(preset)}
          >
            {preset.value}
          </Button>
        );
      });
    } else {
      buttons = null;
    }

    return (
      <div>
        <Group position="center" sx={{ padding: 10 }}>
          {buttons}
        </Group>
      </div>
    );
  }
};

export default NumericPresetContent;
