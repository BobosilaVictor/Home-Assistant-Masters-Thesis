import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  rem,
} from "@mantine/core";
import { Device } from "../../../models";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../navigation";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [theme.fn.smallerThan("sm")]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export interface DevicesProp {
  data: Device[];
}
const MostUsedDevice = ({ data }: DevicesProp) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Most used device</Title>
        <Text fw={500} fz="lg" mb={5}>
          {data[0].definition.model}
        </Text>
        <Text fz="sm" c="dimmed">
          {data[0].definition.description}
        </Text>

        <Link to={`${AppRoutes.DEVICES}/${data[3].friendly_name}`}>
          <div className={classes.controls}>
            <Button className={classes.control}>Show details</Button>
          </div>
        </Link>
      </div>
      <Image
        src={`https://www.zigbee2mqtt.io/images/devices/${data[3].definition.model}.jpg`}
        className={classes.image}
        radius="xl"
      />
    </div>
  );
};

export default MostUsedDevice;
