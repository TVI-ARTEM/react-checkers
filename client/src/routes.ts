import {AUTH_ROUTE, GAME_ROUTE, LOADING_ROUTE, MENU_ROUTE} from "./utils/consts";
import Game from "./pages/Game";
import Menu from "./pages/Menu";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: GAME_ROUTE,
        Component: Game
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

