import { useEffect, useState } from "react";
import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const DataContent = () => {
  const message = "0x00124b0029192503 temperature 5T";
  const [data, setData] = useState();
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.15200.15200.15200.152:8002/");
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
    const receiveMessage = (event: MessageEvent) => {
      setData(JSON.parse(JSON.parse(event.data)));
    };
    socket.addEventListener("message", receiveMessage);
  }, []);
  if (data != undefined) {
    // console.log(data['temperature'])
    const labels = Object.keys(data["temperature"]);
    const values = Object.values(data["temperature"]);
    console.log(data);
    const chart_data = {
      labels,
      datasets: [
        {
          label: "temperature",
          data: values,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    return <Line data={chart_data}></Line>;
  } else {
    return <p>No data</p>;
  }
};

export default DataContent;
