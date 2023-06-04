import {
  ClimateFeature,
  CompositeFeature,
  CoverFeature,
  FanFeature,
  LightFeature,
  LockFeature,
  SwitchFeature,
} from "../../../../models";
import SingleDeviceExposesContent from "../../singleDeviceContent/singleDeviceExposesContent";

type CompositeType =
  | CompositeFeature
  | LightFeature
  | SwitchFeature
  | CoverFeature
  | LockFeature
  | FanFeature
  | ClimateFeature;

interface DeviceExposesProps {
  exposes: CompositeType;
  state: any;
}

const CompositeContent = ({ exposes, state }: DeviceExposesProps) => {
  return (
    <>
      {exposes.features.map((item) => {
        return (
          <SingleDeviceExposesContent
            exposes={item}
            state={state}
          ></SingleDeviceExposesContent>
        );
      })}
    </>
  );
};

export default CompositeContent;
