import { AppShell } from "@mantine/core";
import OptimizationContent from "../components/optimization/optimizationContent";
import { NavbarSimple } from "../components";

const OptimizationPage = () => {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
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
      <OptimizationContent />
    </AppShell>
  );
};

export default OptimizationPage;
