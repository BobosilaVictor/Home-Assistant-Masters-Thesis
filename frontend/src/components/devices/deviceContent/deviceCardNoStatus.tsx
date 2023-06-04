import {
  Card,
  Group,
  Badge,
  createStyles,
  Image,
  rem,
  Text,
} from "@mantine/core";

import { Device } from "../../../models";

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
}));

const DeviceCardNoStatus = ({ item }: CardProp) => {
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

        <div>No status availible!</div>
      </div>
    </Card>
  );
};

export default DeviceCardNoStatus;
