import { ColorPicker, Container } from "@mantine/core";
import { CompositeFeature } from "../../../../models";

interface DeviceExposesProps {
  exposes: CompositeFeature;
  state: any;
}

const ColorComponent = ({ exposes, state }: DeviceExposesProps) => {
  return <ColorPicker size="xl" />;
};

export default ColorComponent;
