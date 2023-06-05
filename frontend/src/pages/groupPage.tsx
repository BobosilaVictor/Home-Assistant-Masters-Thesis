import { AppShell } from "@mantine/core";
import { NavbarSimple } from "../components";
import GroupContent from "../components/devices/groups/GroupContent";

const GroupPage = () => {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
      styles={(theme) => ({
        main: {
          width: "100%",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <GroupContent></GroupContent>
    </AppShell>
  );
};

export default GroupPage;
