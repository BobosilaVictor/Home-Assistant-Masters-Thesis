import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Device, Groups } from "../models";
import { HomePage, DevicePage, GroupPage } from "../pages";
import { incrementByAmount } from "../redux/deviceSlice";
import { useAppDispatch } from "../redux/hooks";
import { AppRoutes } from "./types";
import SingleDevicePage from "../pages/singleDevicePage";
import { addGroups } from "../redux/groupSlice";
import DataPage from "../pages/dataPage";
import OptimizationPage from "../pages/optimizationPage";
import { SocketContext2 } from "../App";
import { prediction_value } from "../redux/optimizerPredictionSlice";

const AppRouter = () => {
  const dispatch = useAppDispatch();

  const message = "0x00124b0029192503 temperature";
  const socket = useContext(SocketContext2);
  useEffect(() => {
    if (socket && socket.readyState == socket.OPEN) {
      socket.send(JSON.stringify(message));
    } else if (socket && socket.readyState == socket.CONNECTING) {
    }
    const receiveMessage = (event: MessageEvent) => {
      dispatch(prediction_value(JSON.parse(event.data)));
    };
    socket.addEventListener("message", receiveMessage);
  });

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.152:5678/");
    const add_devices = (event: MessageEvent) => {
      dispatch(incrementByAmount(JSON.parse(event.data) as Device[]));
    };
    socket.addEventListener("message", add_devices);
    return () => {
      socket.removeEventListener("message", add_devices);
    };
  });
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.152:5680/");
    const add_devices = (event: MessageEvent) => {
      dispatch(addGroups(JSON.parse(event.data) as Groups[]));
    };
    socket.addEventListener("message", add_devices);
    return () => {
      socket.removeEventListener("message", add_devices);
    };
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<HomePage />} />
        <Route path={AppRoutes.DEVICES} element={<DevicePage />} />
        <Route
          path={`${AppRoutes.DEVICES}/:id`}
          element={<SingleDevicePage />}
        />
        <Route path={AppRoutes.GROUPS} element={<GroupPage />}></Route>
        <Route path={AppRoutes.DATA} element={<DataPage />}></Route>
        <Route path={AppRoutes.OPTIMIZE} element={<OptimizationPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
