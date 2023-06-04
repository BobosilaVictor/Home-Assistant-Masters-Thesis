import { AppShell } from "@mantine/core";
import { HomeContent } from "../components";

const HomePage = () => {
  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: {
          position: "relative",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <HomeContent></HomeContent>
    </AppShell>
  );
};

export default HomePage;
