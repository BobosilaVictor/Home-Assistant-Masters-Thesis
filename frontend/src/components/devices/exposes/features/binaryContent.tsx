import { BinaryFeature } from "../../../../models";
import Toggle from "../../../helpers/toggleContent";
import { Group, Text } from "@mantine/core";
import {
  isFeatureAccess,
  isFeatureAccessWrite,
  isFeatureAccessWriteRead,
} from "../typeGuards";
interface DeviceExposesProps {
  exposes: BinaryFeature;
  state: any;
}

const BinaryContent = ({ exposes, state }: DeviceExposesProps) => {
  if (
    exposes.access &&
    (isFeatureAccessWrite(exposes.access) ||
      isFeatureAccessWriteRead(exposes.access) ||
      isFeatureAccess(exposes.access))
  ) {
    return <Toggle exposes={exposes} state={state}></Toggle>;
  } else {
    return (
      <Group>
        <Text>{exposes.property}</Text>
        <Text size="lg" weight="bold">
          {String(state[exposes.property]).toUpperCase()}
        </Text>
      </Group>
    );
  }
};

export default BinaryContent;
