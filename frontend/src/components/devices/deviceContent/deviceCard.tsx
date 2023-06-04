import {
  Card,
  Group,
  Badge,
  Button,
  createStyles,
  Image,
  rem,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Device } from "../../../models";
import DeviceDescriptionContent from "./deviceDescriptionContent";
import { AppRoutes } from "../../../navigation";

interface CardProp {
  item: Device;
}

const useStyles = createStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(3)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: ` 0px ${theme.spacing.md}  ${theme.spacing.md} ${theme.spacing.md}`,
    marginTop: "10px",
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  buttonGroup: {
    paddingTop: "15px",
    width: "100%",
    borderTop: `${rem(3)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const DeviceCard = ({ item }: CardProp) => {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <div>
        <div>
          <Image
            fit="contain"
            src={`https://www.zigbee2mqtt.io/images/devices/${item.definition.model}.jpg`}
            alt={item.friendly_name}
            height={180}
          />
        </div>

        <div className={classes.section}>
          <Group position="apart">
            <Text fz="lg" fw={500}>
              {item.model_id}
            </Text>
            <Badge size="sm">{item.type}</Badge>
          </Group>
          <Text fz="sm" mt="xs">
            {item.definition.description}
          </Text>
        </div>

        <DeviceDescriptionContent exposes={item.definition.exposes} />
      </div>

      <Group mt="xs">
        <Link
          to={`${AppRoutes.DEVICES}/${item.friendly_name}`}
          className={classes.buttonGroup}
        >
          <Button radius="md" style={{ flex: 1, width: "100%" }}>
            Show details
          </Button>
        </Link>
      </Group>
    </Card>
  );
};

export default DeviceCard;
