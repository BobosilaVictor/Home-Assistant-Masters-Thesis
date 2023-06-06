import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Device, Group } from "../models";
import { HomePage, DevicePage, GroupPage } from "../pages";
import { incrementByAmount } from "../redux/deviceSlice";
import { useAppDispatch } from "../redux/hooks";
import { AppRoutes } from "./types";
import SingleDevicePage from "../pages/singleDevicePage";
import { addGroups } from "../redux/groupSlice";
import DataPage from "../pages/dataPage";
import OptimizationPage from "../pages/optimizationPage";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.152:5678/");
    const add_devices = (event: MessageEvent) => {
      dispatch(incrementByAmount(JSON.parse(event.data) as Device[]));
    };
    socket.addEventListener("message", add_devices);
    return () => {
      socket.removeEventListener("message", add_devices);
      // socket.close();
    };
  });
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.152:5680/");
    const add_devices = (event: MessageEvent) => {
      dispatch(addGroups(JSON.parse(event.data) as Group[]));
    };
    socket.addEventListener("message", add_devices);
    return () => {
      socket.removeEventListener("message", add_devices);
      // socket.close();
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
