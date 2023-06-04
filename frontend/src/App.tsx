import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppRouter } from "./navigation";
import React, { createContext } from "react";

const socket = new WebSocket("ws://localhost:8001");
export const SocketContext = createContext(socket);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <MantineProvider theme={{ colorScheme: "dark" }}>
          <Notifications />
          <AppRouter />
        </MantineProvider>
      </Provider>
    </SocketContext.Provider>
  );
}

export default App;
