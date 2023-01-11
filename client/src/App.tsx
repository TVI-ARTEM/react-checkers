import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import {observer} from "mobx-react-lite";
import {Context, ContextType, socket} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import {IUser} from "./store/ContextStore";

const App = observer(() => {
    const {store} = useContext(Context) as ContextType
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        check().then(data => {
            store.user = data as IUser
            store.isAuth = true
            socket.emit('login', JSON.stringify({email: store.user.email}))
        }).catch(err => {
            console.log(err.response.data.message)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
