import { ReactNode } from "react";
import { GenericOrCompositeFeature } from "../../../../models";

import { Card, Group, Text, createStyles, rem } from "@mantine/core";
interface ExposesProp {
  exposes: GenericOrCompositeFeature;
  children: ReactNode;
}

const useStyles = createStyles((theme) => ({
  card: {
    // marginTop: "3%",
    minHeight: "500px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  header: {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  footer: {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    align: "bottom",
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

const FeatureWrapperContent = ({ exposes, children }: ExposesProp) => {
  const { classes } = useStyles();
  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section className={classes.header}>{children}</Card.Section>
      <Card.Section className={classes.footer}>
        <Group position="apart" mt="xl">
          <Text fz="sm" fw={700} className={classes.title}>
            {exposes.name.toUpperCase()}
          </Text>
        </Group>
        <Group position="apart">
          <Text mt="sm" mb="md" c="dimmed" fz="xs">
            {exposes.description}
          </Text>
          <Text mt="sm" mb="md" c="dimmed" fz="xs">
            {exposes.type}
          </Text>
          <Text mt="sm" mb="md" c="dimmed" fz="xs">
            {exposes.unit}
          </Text>
          <Text mt="sm" mb="md" c="dimmed" fz="xs">
            {exposes.property}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default FeatureWrapperContent;
