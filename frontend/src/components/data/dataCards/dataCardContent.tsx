import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCount } from "../../../redux/deviceSlice";
import { Card, Group, Badge, Button, Text, Image, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DataCardModalContent from "./dataCardModalContent";

interface CardProps {
  redis_data: any;
}
const DataCardContent = ({ redis_data }: CardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const current_device_name = redis_data[0];
  const devices = useSelector(selectCount);
  const device = devices.filter(
    (item) => item.friendly_name === current_device_name
  )[0];
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src={`https://www.zigbee2mqtt.io/images/devices/${device.definition.model}.jpg`}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{device.model_id}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {device.definition.description}
      </Text>

      <Modal
        opened={opened}
        onClose={close}
        title={redis_data[0]}
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        {redis_data[1].map((data: any) => {
          return <DataCardModalContent title={redis_data[0]} property={data} />;
        })}
      </Modal>
      <Group position="center">
        <Button onClick={open}>See data</Button>
      </Group>
    </Card>
  );
};

export default DataCardContent;
