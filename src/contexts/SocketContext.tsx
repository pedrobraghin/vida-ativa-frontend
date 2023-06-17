import React, { createContext, useEffect } from "react";

import { useUser } from "../hooks/useUser";
import { EventType } from "../@types/EventType";
import { IOHandler } from "../services/IOHandler";

interface SocketContextProps {
  socket: IOHandler;
  publish(event: EventType): void;
  consume(): EventType[];
}

export const SocketContext = createContext({} as SocketContextProps);

interface SocketProviderProps {
  children: React.ReactNode;
}

function useInitialValue(token: string): SocketContextProps {
  const socket = new IOHandler(token);

  return {
    socket,
    consume: socket.consume,
    publish: socket.publish,
  } as SocketContextProps;
}

export default function SocketProvider({ children }: SocketProviderProps) {
  const { token, isLoggedIn } = useUser();
  const data = useInitialValue(token as string);
  const { socket } = data;

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn]);

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
}
