import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  rem,
  Grid,
  Card,
} from "@mantine/core";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(150deg, rgba(130, 201, 30, 0) 0%, #de8e59 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

const OptimizationContent = () => {
  const { classes } = useStyles();
  const [data, setData] = useState();
  const message = "0x00124b0029192503 temperature";
  const socket = new WebSocket("ws://192.168.100.152:8003/");
  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
    const receiveMessage = (event: MessageEvent) => {
      setData(JSON.parse(JSON.parse(event.data)));
    };
    socket.addEventListener("message", receiveMessage);
  });
  console.log(data)
  return (
    <div>
      <div className={classes.root}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "blue", to: "gray" }}
                >
                  Optimize
                </Text>{" "}
                your devices automation
              </Title>

              <Text className={classes.description} mt={30}>
                Currently supported optimizations: {""}
                <b>Temperature</b>
              </Text>

              <Button
                variant="gradient"
                gradient={{ from: "blue", to: "gray" }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                Start optimizing
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OptimizationContent;
