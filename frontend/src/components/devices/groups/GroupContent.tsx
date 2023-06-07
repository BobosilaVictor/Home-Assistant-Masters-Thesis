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
  Modal,
} from "@mantine/core";
import GroupCardContent from "./groupCardContent";
import { useDisclosure } from "@mantine/hooks";
import GroupModalAdd from "./groupModalAdd";

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
  const [opened, { open, close }] = useDisclosure(false);

  const { classes } = useStyles();

  return (
    <div>
      <div className={classes.label}>Groups!</div>
      <Modal opened={opened} onClose={close} title="Authentication">
        <GroupModalAdd />
      </Modal>
      <Container py="xl">
        <Button onClick={open}> Create a new Group </Button>
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
