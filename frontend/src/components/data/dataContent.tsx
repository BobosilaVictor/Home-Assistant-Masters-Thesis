import DataCardContent from "./dataCards/dataCardContent";
import { Container, Grid, Title, createStyles, rem, Text } from "@mantine/core";

const keys2: { [key: string]: any } = {
  // TempController: [
  //   "linkquality",
  //   "current_heating_setpoint",
  //   "update_available",
  //   "away_preset_days",
  //   "window_open",
  //   "local_temperature_calibration",
  //   "max_temperature",
  //   "eco_temperature",
  //   "boost_time",
  //   "position",
  //   "comfort_temperature",
  //   "local_temperature",
  //   "battery_low",
  //   "min_temperature",
  //   "away_preset_temperature",
  // ],
  "0x54ef4410001fff2e": ["illuminance"],
  "0x00124b00288fc9e7": [
    "tamper",
    "voltage",
    "contact",
    "battery_low",
    "linkquality",
    "battery",
  ],
  "0x00124b0029192503": [
    "linkquality",
    "voltage",
    "temperature",
    "humidity",
    "battery",
  ],
  "0x00124b002917f1bf": [
    "linkquality",
    "voltage",
    "temperature",
    "humidity",
    "battery",
  ],
};
const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
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

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));
const DataContent = () => {
  const { classes } = useStyles();
  return (
    <div>
      <Container className={classes.root}>
        <div className={classes.label}>Warning!</div>
        <Title className={classes.title}>
          This is a really intensive component!
        </Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          You might have issues with this component if your device is on the
          slower side! Make sure you give each modal enough time to load, and if
          it doesn't refreshing might help!
        </Text>
      </Container>
      <Grid columns={3}>
        {Object.entries(keys2).map((key, value) => {
          return (
            <Grid.Col span={1}>
              <DataCardContent redis_data={key} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default DataContent;
