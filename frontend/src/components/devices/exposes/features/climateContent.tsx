import { ClimateFeature } from "../../../../models";
import CompositeContent from "./compositeComponent";

interface DeviceExposesProps {
  exposes: ClimateFeature;
  state: any;
}

const ClimateContent = ({ exposes, state }: DeviceExposesProps) => {
  return <CompositeContent exposes={exposes} state={state}></CompositeContent>;
};

export default ClimateContent;
