import {AUTH_ROUTE, GAME_ROUTE, LOADING_ROUTE, MENU_ROUTE} from "./utils/consts";
import Game from "./pages/Game";
import Loading from "./pages/Loading";
import Menu from "./pages/Menu";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: GAME_ROUTE,
        Component: Game
    },
    {
        path: LOADING_ROUTE,
        Component: Loading
    },
    {
        path: MENU_ROUTE,
        Component: Menu
    },
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]

