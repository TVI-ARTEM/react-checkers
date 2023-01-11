import React, {createContext} from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import ContextStore from "./store/ContextStore";
import io, {Socket} from 'socket.io-client';
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export type ContextType = {
    store: ContextStore,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

export const Context = createContext<ContextType | null>(null)
const url = process.env.REACT_APP_SOCKET_URL || "http://localhost:5050/"
export const socket = io(url)
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{
        store: new ContextStore(),
        socket: socket
    }}>
        <App/>
    </Context.Provider>
);

