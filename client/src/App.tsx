import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context, ContextType} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import {IUser} from "./store/ContextStore";

const App = observer(() => {
    const {store, socket} = useContext(Context) as ContextType
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        check().then(data => {
            store.user = data as IUser
            store.isAuth = true
            socket.emit('login', JSON.stringify({email: store.user.email}))
        }).catch(err => {
            console.log(err.response.data.message)
        }).finally(() => setLoading(false))


        socket.on('error', (msg) => {
            const {status, message} = JSON.parse(msg) as {status: number, message: string}
            alert(message)
        })


        socket.on('update-login', () => {
            console.log('UPDATE-LOGIN')
            socket.emit('login', JSON.stringify({email: store.user.email}))
        })

        socket.on('disconnect', () => {
            console.log("DISCONNECTED");
        });

        return () => {
            socket.off('update-login')
            socket.off('disconnect')
        }
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
