import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import {IUser, UserStoreContextType} from "./store/UserStore";

const App = observer(() => {
    const {user} = useContext(Context) as UserStoreContextType
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.user = data as IUser
            user.isAuth = true
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
