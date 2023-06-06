import {
  createStyles,
  Title,
  Text,
  Card,
  Container,
  Grid,
} from "@mantine/core";
import {
  IconGauge,
  IconUser,
  IconMessage,
  IconWallpaper,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../navigation";
import { useRealtime } from "@space-kit/redis-realtime-react";

const mockdata = [
  {
    title: "Devices",
    description: "Check all the active devices that are currently running",
    icon: IconGauge,
    to: AppRoutes.DEVICES,
  },
  {
    title: "Groups",
    description: "Group all devices",
    icon: IconUser,
    to: AppRoutes.GROUPS,
  },
  {
    title: "Data",
    description: "Check live data from you your devices in a pretty way!",
    icon: IconMessage,
    to: AppRoutes.DATA,
  },
  {
    title: "Optimize",
    description: "Run optimization algorithms to automate the automation",
    icon: IconWallpaper,
    to: AppRoutes.OPTIMIZE,
  },
];

const useStyles = createStyles((theme) => ({
  gird: {
    marginTop: "2%",
  },
  title: {
    fontSize: 34,
    color: "white",
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const HomeContent = () => {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Grid.Col span={4}>
      <Link to={feature.to} className={classes.link}>
        <Card
          key={feature.title}
          shadow="md"
          radius="md"
          className={classes.card}
          p="xl"
        >
          <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
          <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
            {feature.title}
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            {feature.description}
          </Text>
        </Card>
      </Link>
    </Grid.Col>
  ));
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} align="center" mt="sm">
        Home Assistant
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        Enthusiast made solution for automating your daily house tasks!
      </Text>

      <Grid className={classes.gird} grow>
        {features}
      </Grid>
    </Container>
  );
};

export default HomeContent;
