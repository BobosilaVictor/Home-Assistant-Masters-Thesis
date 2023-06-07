import {
  ThemeIcon,
  rem,
  Grid,
  Col,
  Button,
  SimpleGrid,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import {
  IconReceiptOff,
  IconFlame,
  IconCircleDotted,
  IconFileCode,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(36),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

interface BodyProps {
  prediction: string;
}
const OptimzationBody = ({ prediction }: BodyProps) => {
  const { classes } = useStyles();
  const message = "machinelearning";
  const [data, setData] = useState();
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.152:8002/");
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
    const receiveMessage = (event: MessageEvent) => {
      setData(JSON.parse(JSON.parse(event.data)));
    };
    socket.addEventListener("message", receiveMessage);
    return () => {
      socket.close();
    };
  }, []);
  const features = [
    {
      icon: IconReceiptOff,
      title: prediction,
      description:
        "All packages are published under MIT license, you can use Mantine in any project",
    },
    {
      icon: IconFileCode,
      title: "TypeScript based",
      description:
        "Build type safe applications, all components and hooks export types",
    },
    {
      icon: IconCircleDotted,
      title: "No annoying focus ring",
      description:
        "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
    },
    {
      icon: IconFlame,
      title: "Flexible",
      description:
        "Customize colors, spacing, shadows, fonts and many other settings with global theme object",
    },
  ];

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={rem(26)} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="xl" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            A fully optimized LSTM model for temperature prediction
          </Title>
          <Text c="dimmed">
            Using state of the art LSTM models, optimized for even the smallest
            devices, you can now stay back and relax while allowing the
            Assistant to take over
          </Text>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid
            cols={2}
            spacing={30}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>
  );
};

export default OptimzationBody;
