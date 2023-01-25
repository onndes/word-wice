
import LearnWords from './pages/LearnWords'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Vocabulary from './pages/Vocabulary'
import {
    LEARN_WORDS_ROUTE,
    LOGIN_ROUTE,
    MENU_ROUTE,
    VOCABULARY_ROUTE,
} from './utils/consts'

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login />,
    },
]
export const privateRoutes = [
    {
        path: VOCABULARY_ROUTE,
        Component: <Vocabulary />,
    },
    {
        path: LEARN_WORDS_ROUTE,
        Component: <LearnWords />,
    },
    {
        path: MENU_ROUTE,
        Component: <Menu />,
    }
]
