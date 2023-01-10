import React, {createContext} from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore, {UserStoreContextType} from "./store/UserStore";

export const Context = createContext<UserStoreContextType | null>(null)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Context.Provider value={{
        user: new UserStore()
    }}>
        <App/>
    </Context.Provider>
);

