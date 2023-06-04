import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
  BackgroundImage,
} from "@mantine/core";
import { Dots } from "./Dots";
import { Device } from "../../../models";
import {
  bind,
  exposes,
  group,
  settings,
} from "../../../redux/buttonSlice";
import { useAppDispatch } from "../../../redux/hooks";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.black : theme.white,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));


interface DeviceProp {
  item: Device;
}
export const HeroText = ({ item }: DeviceProp) => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  return (
    <BackgroundImage
      src={`https://www.zigbee2mqtt.io/images/devices/${item.definition.model}.jpg`}
      radius="xl"
    >
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
        <div className={classes.inner}>
          <Title className={classes.title}>
            {item.model_id}{" "}
            <Text component="span" className={classes.highlight} inherit>
              by {item.manufacturer}
            </Text>{" "}
            for you
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              {item.definition.model} {item.definition.description}
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              size="lg"
              variant="default"
              color="gray"
              onClick={() => dispatch(exposes())}
            >
              Exposes
            </Button>
            <Button
              className={classes.control}
              size="lg"
              onClick={() => dispatch(bind())}
            >
              Bind
            </Button>
            <Button
              className={classes.control}
              size="lg"
              onClick={() => dispatch(group())}
            >
              Add to group
            </Button>
            <Button
              className={classes.control}
              size="lg"
              onClick={() => dispatch(settings())}
            >
              Settings
            </Button>
          </div>
        </div>
      </Container>
    </BackgroundImage>
  );
};

export default HeroText;
