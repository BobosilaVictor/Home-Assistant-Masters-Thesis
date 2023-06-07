import { AspectRatio, Card, createStyles, rem, Text } from "@mantine/core";
import { Group } from "../../../models";

interface GroupProps {
  group: Group;
}
const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  label: {
    textAlign: "center",
    fontWeight: 200,
    fontSize: rem(50),
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
const GroupCardContent = ({ group }: GroupProps) => {
  const { classes } = useStyles();
  console.log(group)
  return (
    <Card
      key={group.id}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <div className={classes.label}>{group.friendly_name}</div>
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {group.id}
      </Text>
      <Text className={classes.title} mt={5}>
        {group.members.map((member)=>{
            return(<Text>{member.ieee_address}</Text>)
        })}
      </Text>
    </Card>
  );
};

export default GroupCardContent;
