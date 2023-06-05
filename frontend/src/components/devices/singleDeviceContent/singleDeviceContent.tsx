import { useSelector } from "react-redux";
import { selectCount } from "../../../redux/deviceSlice";
import HeroText from "./singleDeviceHeader";
import { Grid } from "@mantine/core";
import SingleDeviceExposesContent from "./singleDeviceExposesContent";
import { selectButton } from "../../../redux/buttonSlice";
import SingleDeviceBind from "./singleDeviceBind";
import SingleDeviceGroup from "./singleDeviceGroup";
import SingleDeviceSettings from "./singleDeviceSettings";

const SingleDeviceContent = () => {
  const current_device_name = window.location.pathname.split("/")[2];
  const devices = useSelector(selectCount);
  const button = useSelector(selectButton);
  const component_array = [
    "placeholder_value",
    <SingleDeviceBind />,
    <SingleDeviceGroup />,
    <SingleDeviceSettings />,
  ];

  const device = devices.filter(
    (item) => item.friendly_name === current_device_name
  )[0];
  if (device == undefined) {
    return <>Loading</>;
  } else {
    if (button == 0) {
      return (
        <div>
          <HeroText item={device} />
          <br />
          <Grid grow>
            {device.definition.exposes.map((expose) => {
              return (
                <SingleDeviceExposesContent
                  exposes={expose}
                  state={device.status}
                />
              );
            })}
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <HeroText item={device} />
          <br />
          {component_array[button]}
        </div>
      );
    }
  }
};

export default SingleDeviceContent;
