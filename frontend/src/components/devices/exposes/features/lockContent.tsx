import { LockFeature } from "../../../../models";
import CompositeContent from "./compositeComponent";

interface DeviceExposesProps {
  exposes: LockFeature;
  state: any;
}

const LockContent = ({ exposes, state }: DeviceExposesProps) => {
  return <CompositeContent exposes={exposes} state={state}></CompositeContent>;
};

export default LockContent;
