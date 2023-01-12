import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {AUTH_ROUTE, MENU_ROUTE} from "../utils/consts";
import {Context, ContextType} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer( () => {
    const {store} = useContext(Context) as ContextType
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
                {store.isAuth && authComponents}
                {publicComponents}
                <Route path="*" element={
                    <Navigate to={store.isAuth ? MENU_ROUTE : AUTH_ROUTE} replace={true}/>
                }/>
            </Routes>
        </>
    );
});

export default AppRouter;