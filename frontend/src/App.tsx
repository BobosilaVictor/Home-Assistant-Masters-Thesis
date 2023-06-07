import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppRouter } from "./navigation";
import React, { createContext } from "react";
import { selectOptimizationButton } from "./redux/optimizationButtonSlice";

const socket = new WebSocket("ws://192.168.100.152:8001");
export const SocketContext = createContext(socket);

const socket2 = new WebSocket("ws://192.168.100.152:8003");
export const SocketContext2 = createContext(socket2);

function App() {
  return (
    <SocketContext2.Provider value={socket2}>
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <Notifications />
            <AppRouter />
          </MantineProvider>
        </Provider>
      </SocketContext.Provider>
    </SocketContext2.Provider>
  );
}

export default App;
