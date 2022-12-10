import Home from './pages/Home'
import Login from './pages/Login'
import { HOME_ROUTE, LOGIN_ROUTE } from './utils/consts'

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login />,
    },
]
export const privateRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home />,
    },
]
