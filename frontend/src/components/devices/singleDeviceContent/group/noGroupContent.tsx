import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { AppRoutes } from "../../../../navigation";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const NoGroupContent = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>No Groups!</div>
      <Title className={classes.title}>You don't have any groups.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, right now you haven't created any groups. Therefore, you
        can't add this device to a group. Click the button below to create a new
        group!
      </Text>
      <Group position="center">
        <Link to={AppRoutes.GROUPS}>
          <Button variant="subtle" size="md">
            Create a new group!
          </Button>
        </Link>
      </Group>
    </Container>
  );
};

export default NoGroupContent;
