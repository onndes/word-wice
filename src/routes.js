import AddWordPage from './pages/AddWordPage'
import LearnWords from './pages/LearnWords'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Vocabulary from './pages/Vocabulary'
import {
    ADD_WORD_ROUTE,
    LEARN_WORDS_ROUTE,
    LOGIN_ROUTE,
    MENU_ROUTE,
    WORDS_ROUTE,
} from './utils/consts'

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login />,
    },
]
export const privateRoutes = [
    {
        path: WORDS_ROUTE,
        Component: <Vocabulary />,
    },
    {
        path: LEARN_WORDS_ROUTE,
        Component: <LearnWords />,
    },
    {
        path: MENU_ROUTE,
        Component: <Menu />,
    },

    {
        path: ADD_WORD_ROUTE,
        Component: <AddWordPage />,
    },
]
