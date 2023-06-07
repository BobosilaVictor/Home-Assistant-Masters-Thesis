import {
  AspectRatio,
  Button,
  Card,
  createStyles,
  Divider,
  Group,
  rem,
  Space,
  Text,
} from "@mantine/core";
import { Groups } from "../../../models";
import { IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import { SocketContext } from "../../../App";

interface GroupProps {
  group: Groups;
}
const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  label: {
    textAlign: "center",
    fontWeight: 200,
    fontSize: rem(50),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },
}));
const GroupCardContent = ({ group }: GroupProps) => {
  const { classes } = useStyles();
  const socket = useContext(SocketContext);
  const send_data = (value: number) => {
    console.log(value);
    const message = "remove_group" + " " + "remove" + " " + value;

    if (socket && socket.readyState == socket.OPEN) {
      console.log(message);
      socket.send(JSON.stringify(message));
    }
  };
  console.log(group);
  return (
    <Card
      key={group.id}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <div className={classes.label}>{group.friendly_name}</div>
      </AspectRatio>
      <Group spacing="xl" position="apart">
        <Text
          color="dimmed"
          size="xl"
          transform="uppercase"
          weight={700}
          mt="md"
        >
          ID: {group.id}
        </Text>
        <Button
          onClick={() => send_data(group.id)}
          color="red"
          leftIcon={<IconTrash size="1rem" />}
        >
          Delete
        </Button>
      </Group>
      <Space />
      <Text mt={30}>
        Members:
        {group.members.map((member) => {
          return <Text>{member.ieee_address}</Text>;
        })}
      </Text>
    </Card>
  );
};

export default GroupCardContent;
