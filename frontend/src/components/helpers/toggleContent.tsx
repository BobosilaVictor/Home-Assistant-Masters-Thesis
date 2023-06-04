import { useContext, useState } from "react";
import { Switch, Group, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { BinaryFeature } from "../../models";
import { SocketContext } from "../../App";

interface ExposesProp {
  exposes: BinaryFeature;
  state: any;
}
const Toggle = ({ exposes, state }: ExposesProp) => {
  const current_device_name = window.location.pathname.split("/")[2];
  const initial_value = state[exposes.property];
  let something = undefined;
  if (initial_value == "ON") {
    something = true;
  } else if (initial_value == "OFF") {
    something = false;
  }
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(something);
  const socket = useContext(SocketContext);

  const changed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
    let formated_check = undefined;
    if (checked == true) {
      formated_check = "OFF";
    } else if (checked == false) {
      formated_check = "ON";
    } else {
      formated_check = checked;
    }

    const message =
      exposes.name +
      " " +
      current_device_name +
      " " +
      exposes.property +
      " " +
      formated_check;

    if (socket && socket.readyState == socket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };
  return (
    <Group position="center">
      <Switch
        checked={checked}
        onChange={changed}
        color="teal"
        size="md"
        label={exposes.description}
        thumbIcon={
          checked ? (
            <IconCheck
              size="0.8rem"
              color={theme.colors.teal[theme.fn.primaryShade()]}
              stroke={3}
            />
          ) : (
            <IconX
              size="0.8rem"
              color={theme.colors.red[theme.fn.primaryShade()]}
              stroke={3}
            />
          )
        }
      />
    </Group>
  );
};
export default Toggle;
