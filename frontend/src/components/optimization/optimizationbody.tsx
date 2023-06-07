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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
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
  if (data) {
    const labels = Object.keys(data["placeholder"]);
    const values = Object.values(data["placeholder"]);
    console.log(values);
    const last_value = values[values.length - 1];
    const previous_value = values[values.length - 2];
    const chart_data = {
      labels,
      datasets: [
        {
          label: "Predictions",
          data: values,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    const features = [
      {
        icon: IconReceiptOff,
        title: last_value as number,
        description: "Last prediction!",
      },
      {
        icon: IconFileCode,
        title: previous_value as number,
        description: "Previous prediction!",
      },
    ];

    const items = features.map((feature) => (
      <div>
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
              Using state of the art LSTM models, optimized for even the
              smallest devices, you can now stay back and relax while allowing
              the Assistant to take over
            </Text>
          </Col>
          <Col span={10} md={7}>
            <SimpleGrid
              cols={2}
              spacing={30}
              breakpoints={[{ maxWidth: "md", cols: 1 }]}
            >
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
        <Line data={chart_data}></Line>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default OptimzationBody;
