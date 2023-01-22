import { Settings } from '@mui/icons-material'
import Home from './pages/Home'
import LearnWords from './pages/LearnWords'
import Login from './pages/Login'
import Vocabulary from './pages/Vocabulary'
import {
    HOME_ROUTE,
    LEARN_WORDS_ROUTE,
    LOGIN_ROUTE,
    SETTINGS_ROUTE,
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
        path: HOME_ROUTE,
        Component: <Home />,
    },
    {
        path: VOCABULARY_ROUTE,
        Component: <Vocabulary />,
    },
    {
        path: LEARN_WORDS_ROUTE,
        Component: <LearnWords />,
    },
    {
        path: SETTINGS_ROUTE,
        Component: <Settings />,
    },
]
