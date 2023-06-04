import { Text, Title } from "@mantine/core";
import { NumericFeature } from "../../../../models";
import StatsRingCard from "../../../helpers/statsContent";
import NumericPresetContent from "./numericPresetContent";
import {
  isFeatureAccess,
  isFeatureAccessWrite,
  isFeatureAccessWriteRead,
} from "../typeGuards";
import SliderContent from "../../../helpers/sliderContent";

interface DeviceExposesProps {
  exposes: NumericFeature;
  state: any;
}

const NumericContent = ({ exposes, state }: DeviceExposesProps) => {
  if (exposes.value_max != undefined && exposes.value_min != undefined) {
    if (
      exposes.access &&
      (isFeatureAccessWrite(exposes.access) ||
        isFeatureAccessWriteRead(exposes.access) ||
        isFeatureAccess(exposes.access))
    ) {
      return (
        <div>
          <StatsRingCard
            title={exposes.name.toUpperCase()}
            completed={state[exposes.property]}
            total={exposes.value_max}
            stats={[
              {
                value: exposes.value_min,
                label: "Remaining",
              },
            ]}
          />
          <SliderContent feature={exposes} state={state} />
          <NumericPresetContent
            exposes={exposes.presets}
            property={exposes.property}
            state={state}
          />
        </div>
      );
    } else {
      return (
        <div>
          <StatsRingCard
            title={exposes.name.toUpperCase()}
            completed={state[exposes.property]}
            total={exposes.value_max}
            stats={[
              {
                value: exposes.value_min,
                label: "Remaining",
              },
            ]}
          />
          <NumericPresetContent
            exposes={exposes.presets}
            property={exposes.property}
            state={state}
          />
        </div>
      );
    }
  } else {
    return (
      <div>
        <Title>{exposes.name.toUpperCase()}</Title>
        <Text size={25}>
          {state[exposes.property]} {exposes.unit}
        </Text>
      </div>
    );
  }
};

export default NumericContent;
