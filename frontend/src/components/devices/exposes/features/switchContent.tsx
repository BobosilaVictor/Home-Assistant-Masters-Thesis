import { GenericOrCompositeFeature, SwitchFeature } from "../../../../models";
import CompositeContent from "./compositeComponent";

interface DeviceExposesProps {
  exposes: SwitchFeature;
  state: any;
}

const SwitchContent = ({ exposes, state }: DeviceExposesProps) => {
  return <CompositeContent exposes={exposes} state={state}></CompositeContent>;
};

export default SwitchContent;
