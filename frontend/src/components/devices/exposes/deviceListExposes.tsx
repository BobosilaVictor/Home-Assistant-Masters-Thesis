import { Card, Text } from "@mantine/core";
import { GenericOrCompositeFeature } from "../../../models";

interface ExposedProp {
  exposedItem: GenericOrCompositeFeature;
}

const DeviceListExposesContent = ({ exposedItem }: ExposedProp) => {
  return (
    <Card>
      <Text size={15}>{exposedItem.name}</Text>
    </Card>
  );
};

export default DeviceListExposesContent;
