import { AppShell } from "@mantine/core";
import { DeviceContent, NavbarSimple } from "../components";

const DevicePage = () => {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
      styles={(theme) => ({
        main: {
          width:"100%",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <DeviceContent/>
    </AppShell>
  );
};

export default DevicePage;
