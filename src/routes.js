import LevelsPage from './components/DataBaseWords/Page/LevelsPage'
import TopicsPage from './components/DataBaseWords/Page/TopicsPage'
import AddWordPage from './pages/AddWordPage'
import LearnNew from './pages/LearnWords/LearnNew'
import LearnRepeat from './pages/LearnWords/LearnRepeat'
import LearnWords from './pages/LearnWords/LearnWords'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import Words from './pages/Words'
import WordsBase from './pages/WordsBase'
import {
    ADD_WORD_ROUTE,
    BASE_WORDS_ROUTE,
    LEARN_NEW_ROUTE,
    LEARN_REPEAT_ROUTE,
    LEARN_WORDS_ROUTE,
    LEVEL_BASE_WORDS_ROUTE,
    LOGIN_ROUTE,
    MENU_ROUTE,
    PROFILE_ROUTE,
    TOP1000_BASE_WORDS_ROUTE,
    WORDS_ROUTE,
} from './common/consts/ROUTES'
import TopThousandWordsPage from './components/DataBaseWords/Page/TopThousandWordsPage'

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
    {
        path: BASE_WORDS_ROUTE,
        Component: <WordsBase />,
    },
    {
        path: LEVEL_BASE_WORDS_ROUTE,
        Component: <LevelsPage />,
    },
    {
        path: `${LEVEL_BASE_WORDS_ROUTE}/:id`,
        Component: <TopicsPage />,
    },
    {
        path: `${LEVEL_BASE_WORDS_ROUTE}/:id/:topic`,
        Component: <TopicsPage />,
    },
    {
        path: TOP1000_BASE_WORDS_ROUTE,
        Component: <TopThousandWordsPage />,
    },
]
