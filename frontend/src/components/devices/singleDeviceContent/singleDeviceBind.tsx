import { useSelector } from "react-redux";
import { selectCount } from "../../../redux/deviceSlice";
import { Container, createStyles, rem, Text } from "@mantine/core";
import OtherDevices from "./bind/otherDevices";
const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: rem(100),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(32),
    fontWeight: 500,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },
  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(20),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(18),
    },
  },
}));

const SingleDeviceBind = () => {
  const { classes } = useStyles();

  const devices = useSelector(selectCount);
  const current_device_name = window.location.pathname.split("/")[2];
  const current_device = devices.filter(
    (item) => item.friendly_name === current_device_name
  )[0];
  return (
    <div>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          You should{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            bind {current_device_name}
          </Text>{" "}
          to combine the existing functionalities
        </h1>

        <Text className={classes.description} color="dimmed">
          Bind the current device to any other existing device featured - in the
          list below!
        </Text>
      </Container>
      <OtherDevices devices={devices} current_device={current_device} />
    </div>
  );
};

export default SingleDeviceBind;
