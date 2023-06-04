import { Grid } from "@mantine/core";
import { GenericOrCompositeFeature } from "../../../models";
import BinaryContent from "../exposes/features/binaryContent";
import EnumContent from "../exposes/features/enumContent";
import FeatureWrapperContent from "../exposes/features/featureWrapperContent";
import LightContent from "../exposes/features/lightContent";
import NumericContent from "../exposes/features/numericContent";
import {
  isBinaryFeature,
  isClimateFeature,
  isColorFeature,
  isCompositeFeature,
  isEnumFeature,
  isLightFeature,
  isLockFeature,
  isNumericFeature,
  isSwitchFeature,
} from "../exposes/typeGuards";
import CompositeContent from "../exposes/features/compositeComponent";
import ColorComponent from "../exposes/features/colorComponent";
import SwitchContent from "../exposes/features/switchContent";
import ClimateContent from "../exposes/features/climateContent";
import LockContent from "../exposes/features/lockContent";

interface DeviceExposesProps {
  exposes: GenericOrCompositeFeature;
  state: object;
}

const SingleDeviceExposesContent = ({ exposes, state }: DeviceExposesProps) => {
  if (isBinaryFeature(exposes)) {
    return (
      <Grid.Col span={4}>
        <FeatureWrapperContent exposes={exposes}>
          <BinaryContent exposes={exposes} state={state} />
        </FeatureWrapperContent>
      </Grid.Col>
    );
  } else if (isNumericFeature(exposes)) {
    return (
      <Grid.Col span={4}>
        <FeatureWrapperContent exposes={exposes}>
          <NumericContent exposes={exposes} state={state} />
        </FeatureWrapperContent>
      </Grid.Col>
    );
  } else if (isEnumFeature(exposes)) {
    return (
      <Grid.Col span={4}>
        <FeatureWrapperContent exposes={exposes}>
          <EnumContent
            exposes={exposes}
            property={exposes.property}
            state={state}
          />
        </FeatureWrapperContent>
      </Grid.Col>
    );
  } else if (isLightFeature(exposes)) {
    return <LightContent exposes={exposes} state={state}></LightContent>;
  } else if (isCompositeFeature(exposes)) {
    return (
      <CompositeContent exposes={exposes} state={state}></CompositeContent>
    );
  } else if (isColorFeature(exposes)) {
    return (
      <Grid.Col span={4}>
        <FeatureWrapperContent exposes={exposes}>
          <ColorComponent exposes={exposes} state={state}></ColorComponent>
        </FeatureWrapperContent>
      </Grid.Col>
    );
  } else if (isSwitchFeature(exposes)) {
    return <SwitchContent exposes={exposes} state={state}></SwitchContent>;
  } else if (isClimateFeature(exposes)) {
    return <ClimateContent exposes={exposes} state={state} />;
  } else if (isLockFeature(exposes)) {
    return <LockContent exposes={exposes} state={state} />;
  } else {
    return null;
  }
};

export default SingleDeviceExposesContent;
