import { Button, Container, Grid, createStyles, rem } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectCount } from "../../../redux/deviceSlice";
import DeviceCard from "./deviceCard";
import DeviceCardNoStatus from "./deviceCardNoStatus";
import MostUsedDevice from "./mostUsedDevice";
const useStyles = createStyles((theme) => ({
  section: {
    marginTop:"2%",
  },
}));
const DeviceContent = () => {
  const count = useSelector(selectCount);
  const ceva = count;
  const { classes } = useStyles();
  if (!!ceva.length) {
    return (
      <div>
        <MostUsedDevice data={ceva} />
        <Container size="xl">
          <Grid columns={3}>
            {ceva.map((item) => {
              if (item.status != undefined) {
                return (
                  <Grid.Col key={item.ieee_address} span={1}>
                    <DeviceCard item={item}></DeviceCard>
                  </Grid.Col>
                );
              }
            })}
          </Grid>
        </Container>
        <Container className={classes.section} size="xl">
          <Grid columns={3}>
            {ceva.map((item) => {
              if (item.status == undefined) {
                return (
                  <Grid.Col key={item.ieee_address} span={1}>
                    <DeviceCardNoStatus item={item}></DeviceCardNoStatus>
                  </Grid.Col>
                );
              }
            })}
          </Grid>
        </Container>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default DeviceContent;
