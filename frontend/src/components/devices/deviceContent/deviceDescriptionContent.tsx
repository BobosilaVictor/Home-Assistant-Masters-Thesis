import { Group, Text, createStyles } from "@mantine/core";
import { GenericOrCompositeFeature, GenericFeatureType } from "../../../models";
import DeviceListExposesContent from "../exposes/deviceListExposes";

const useStyles = createStyles((theme) => ({
  section2: {
    padding: ` 0px ${theme.spacing.md}  ${theme.spacing.md} ${theme.spacing.md}`,
  },
  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface DescriptionProp {
  exposes: GenericOrCompositeFeature[];
}
const DeviceDescriptionContent = ({ exposes }: DescriptionProp) => {
  const { classes } = useStyles();
  return (
    <div className={classes.section2}>
      <Text mt="md" className={classes.label} c="dimmed">
        Containts the following:
      </Text>
      <Group spacing={7} mt={5}>
        {exposes.map((exposed) => {
          if (IsGeneric(exposed.type)) {
            return <DeviceListExposesContent exposedItem={exposed} />;
          }
        })}
      </Group>
    </div>
  );
};

function IsGeneric(arg: String): arg is GenericFeatureType {
  return ["numeric", "binary", "enum", "text", "list"].some(
    (element) => element === arg
  );
}

export default DeviceDescriptionContent;
