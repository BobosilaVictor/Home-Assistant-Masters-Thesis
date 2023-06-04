import { Carousel, Embla } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
  Progress,
} from "@mantine/core";
import {
  Device,
  DeviceEndpoints,
  NumericFeaturePreset,
} from "../../../../models";
import { useState, useCallback, useEffect, useContext } from "react";
import { SocketContext } from "../../../../App";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  description: {
    color: theme.colors.dark[5],
    opacity: 0.7,
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

interface CardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  deviceName: string;
  endpoints: DeviceEndpoints;
}

function Card({
  image,
  title,
  category,
  description,
  deviceName,
  endpoints,
}: CardProps) {
  const { classes } = useStyles();
  const [buttonText, setButtonText] = useState(true);
  const current_device_name = window.location.pathname.split("/")[2];
  const socket = useContext(SocketContext);
  let x = false;
  const check_if_binded = () => {
    Object.keys(endpoints).map((index: string) => {
      endpoints[index].bindings.map((binding) => {
        // console.log(binding.target.ieee_address == deviceName)
        if (binding.target.ieee_address == deviceName) {
          // console.log(true)
          x = true;
          return true;
        }
      });
    });
  };
  check_if_binded();

  const send_data = () => {
    let converter = undefined;
    setButtonText(!buttonText);
    if (x == true) {
      converter = "unbind";
    } else {
      converter = "bind";
    }
    const message = deviceName + " " + current_device_name + " " + converter;

    if (socket && socket.readyState == socket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `url(https://www.zigbee2mqtt.io/images/devices/${image}.jpg)`,
        backgroundSize: "100% 100%",
      }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        <Title order={3} className={classes.description}>
          {description}
        </Title>
      </div>
      <Button
        id="my_button"
        variant="outline"
        color="dark"
        onClick={() => send_data()}
      >
        {x ? "Unbind" : "Bind"}
      </Button>
    </Paper>
  );
}

interface DeviceProp {
  devices: Device[];
  current_device: Device;
}
const OtherDevices = ({ devices, current_device }: DeviceProp) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5679/");
    const add_devices = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (typeof data[0] === "string") {
        notifications.show({ title: data[0], message: "" });
      }
      if (typeof data[1] === "string") {
        notifications.show({ title: data[1], message: "" });
      }
    };
    socket.addEventListener("message", add_devices);
    return () => {
      socket.removeEventListener("message", add_devices);
      socket.close();
    };
  }, []);
  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla]);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = devices.map((item: Device) => (
    <Carousel.Slide key={item.friendly_name}>
      <Card
        deviceName={item.ieee_address}
        image={item.definition.model}
        title={item.model_id}
        category={item.type}
        description={item.definition.description}
        endpoints={current_device.endpoints}
      />
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        slideSize="50%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
        slideGap="xl"
        initialSlide={0}
        getEmblaApi={setEmbla}
        slidesToScroll={mobile ? 1 : 2}
      >
        {slides}
      </Carousel>
      <Progress
        value={scrollProgress}
        styles={{
          bar: { transitionDuration: "0ms" },
          root: { maxWidth: rem(320) },
        }}
        size="sm"
        mt="xl"
        mx="auto"
      />
    </>
  );
};

export default OtherDevices;
