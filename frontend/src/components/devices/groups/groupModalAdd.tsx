import { useContext, useState } from "react";
import { SocketContext } from "../../../App";
import { Button, TextInput, createStyles, rem } from "@mantine/core";
const useStyles = createStyles(
  (theme, { floating }: { floating: boolean }) => ({
    root: {
      position: "relative",
    },

    label: {
      position: "absolute",
      zIndex: 2,
      top: rem(7),
      left: theme.spacing.sm,
      pointerEvents: "none",
      color: floating
        ? theme.colorScheme === "dark"
          ? theme.white
          : theme.black
        : theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
      transition:
        "transform 150ms ease, color 150ms ease, font-size 150ms ease",
      transform: floating
        ? `translate(-${theme.spacing.sm}, ${rem(-28)})`
        : "none",
      fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
      fontWeight: floating ? 500 : 400,
    },

    required: {
      transition: "opacity 150ms ease",
      opacity: floating ? 1 : 0,
    },

    input: {
      "&::placeholder": {
        transition: "color 150ms ease",
        color: !floating ? "transparent" : undefined,
      },
    },
  })
);
const GroupModalAdd = () => {
  const socket = useContext(SocketContext);
  const send_data = (value:string) => {
    console.log(value)
    const message = "add_group" + " " + "add" + " " + value;

    if (socket && socket.readyState == socket.OPEN) {
        console.log(message)
      socket.send(JSON.stringify(message));
    }
  };
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  return (
    <div>
      <TextInput
        label="Group name:"
        placeholder="E.g Bathroom"
        required
        classNames={classes}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mt="md"
        autoComplete="nope"
      />
      <Button onClick={() => send_data(value)}>Create!</Button>
    </div>
  );
};

export default GroupModalAdd;
