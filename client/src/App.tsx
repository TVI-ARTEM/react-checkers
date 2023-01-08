import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import {observer} from "mobx-react-lite";

const App = observer(() => {

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
