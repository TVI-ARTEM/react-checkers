import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {AUTH_ROUTE, MENU_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {UserStoreContextType} from "../store/UserStore";
import {observer} from "mobx-react-lite";

const AppRouter = observer( () => {
    const {user} = useContext(Context) as UserStoreContextType
    const authComponents = authRoutes.map(
        ({path, Component}) =>
            <Route path={path} key={path} element={<Component/>}/>
    )

    const publicComponents = publicRoutes.map(
        ({path, Component}) =>
            <Route path={path} key={path} element={<Component/>}/>
    )

    return (
        <>
            <Routes>
                {user.isAuth && authComponents}
                {publicComponents}
                <Route path="*" element={
                    <Navigate to={user.isAuth ? MENU_ROUTE : AUTH_ROUTE} replace={true}/>
                }/>
            </Routes>
        </>
    );
});

export default AppRouter;