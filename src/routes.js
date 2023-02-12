import AddWordPage from './pages/AddWordPage'
import LearnNew from './pages/LearnWords/LearnNew'
import LearnRepeat from './pages/LearnWords/LearnRepeat'
import LearnWords from './pages/LearnWords/LearnWords'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import Words from './pages/Words'
import {
    ADD_WORD_ROUTE,
    LEARN_NEW_ROUTE,
    LEARN_REPEAT_ROUTE,
    LEARN_WORDS_ROUTE,
    LOGIN_ROUTE,
    MENU_ROUTE,
    PROFILE_ROUTE,
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
        Component: <Words />,
    },
    {
        path: LEARN_WORDS_ROUTE,
        Component: <LearnWords />,
    },
    {
        path: LEARN_NEW_ROUTE,
        Component: <LearnNew />,
    },
    {
        path: LEARN_REPEAT_ROUTE,
        Component: <LearnRepeat />,
    },
    {
        path: MENU_ROUTE,
        Component: <Menu />,
    },
    {
        path: ADD_WORD_ROUTE,
        Component: <AddWordPage />,
    },
    {
        path: PROFILE_ROUTE,
        Component: <Profile />,
    },
]
