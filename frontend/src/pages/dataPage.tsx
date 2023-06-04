import { AppShell } from "@mantine/core";
import { NavbarSimple } from "../components";
import DataContent from "../components/data/dataContent";

const DataPage = () => {
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
      <DataContent></DataContent>
    </AppShell>
  );
};

export default DataPage;
