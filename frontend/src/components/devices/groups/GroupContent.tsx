import { useSelector } from "react-redux";
import { selectGroups } from "../../../redux/groupSlice";
import {
  AspectRatio,
  Button,
  Card,
  Container,
  SimpleGrid,
  createStyles,
  Text,
  rem,
} from "@mantine/core";
import GroupCardContent from "./groupCardContent";

const useStyles = createStyles((theme) => ({
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
}));
const GroupContent = () => {
  const groups = useSelector(selectGroups);
  const { classes } = useStyles();

  return (
    <div>
      <div className={classes.label}>Groups!</div>
      <Container py="xl">
      <Button> Create a new Group </Button>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {groups.map((group) => {
            return <GroupCardContent group={group} />;
          })}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default GroupContent;
