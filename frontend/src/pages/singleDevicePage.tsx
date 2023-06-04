import { AppShell } from "@mantine/core";
import { SingleDeviceContent, NavbarSimple } from "../components";

const SingleDevicePage = () => {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
      styles={(theme) => ({
        main: {
          // width:"200%",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
    <SingleDeviceContent></SingleDeviceContent>
    </AppShell>
  );
};

export default SingleDevicePage;