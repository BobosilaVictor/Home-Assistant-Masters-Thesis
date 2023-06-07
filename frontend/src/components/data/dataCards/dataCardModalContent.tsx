import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import NoDataContent from "./noDataContent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface ModalContent {
  property: string;
  title: string;
}

const DataCardModalContent = ({ property, title }: ModalContent) => {
  const message = title + " " + property + " " + "1T";
  const [data, setData] = useState();
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.152:8002/");
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
    const receiveMessage = (event: MessageEvent) => {
      setData(JSON.parse(JSON.parse(event.data)));
    };
    socket.addEventListener("message", receiveMessage);
    return () => {
        socket.close();
      }
  }, []);
  if (data != undefined) {
    const labels = Object.keys(data[property]);
    const values = Object.values(data[property]);
    const chart_data = {
      labels,
      datasets: [
        {
          label: property,
          data: values,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    return <Line data={chart_data}></Line>;
  } else {
    return <NoDataContent></NoDataContent>;
  }
};

export default DataCardModalContent;
