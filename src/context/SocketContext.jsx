import React, { useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io();

const SocketContext = React.createContext();
export const UseSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
