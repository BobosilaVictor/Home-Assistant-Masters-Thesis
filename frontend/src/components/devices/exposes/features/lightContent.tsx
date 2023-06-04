import { GenericOrCompositeFeature, LightFeature } from "../../../../models";
import CompositeContent from "./compositeComponent";

interface DeviceExposesProps {
  exposes: LightFeature;
  state: any;
}

const LightContent = ({ exposes, state }: DeviceExposesProps) => {
  return <CompositeContent exposes={exposes} state={state}></CompositeContent>;
};

export default LightContent;
