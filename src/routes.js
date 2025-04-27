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
    ABOUT_APP_ROUTE,
    ADD_WORD_ROUTE,
    BASE_WORDS_ROUTE,
    LEARN_NEW_ROUTE,
    LEARN_REPEAT_ROUTE,
    LEARN_WORDS_ROUTE,
    LEVEL_V1_WORDS_ROUTE,
    LEVEL_V2_WORDS_ROUTE,
    LOGIN_ROUTE,
    MENU_ROUTE,
    PROFILE_ROUTE,
    TOP1000_BASE_WORDS_ROUTE,
    WORDS_ROUTE,
} from './common/consts/ROUTES'
import TopThousandWordsPage from './components/DataBaseWords/Page/TopThousandWordsPage'
import AboutTheApp from './pages/AboutTheApp'

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
    // words base v1 (old)
    {
        path: LEVEL_V1_WORDS_ROUTE,
        Component: <LevelsPage linkbase={LEVEL_V1_WORDS_ROUTE} />,
    },
    {
        path: `${LEVEL_V1_WORDS_ROUTE}/:id`,
        Component: <TopicsPage linkbase={LEVEL_V1_WORDS_ROUTE} />,
    },
    {
        path: `${LEVEL_V1_WORDS_ROUTE}/:id/:topic`,
        Component: <TopicsPage linkbase={LEVEL_V1_WORDS_ROUTE} />,
    },
    // ---------------------
    // words base v2 (new)
    {
        path: LEVEL_V2_WORDS_ROUTE,
        Component: <LevelsPage linkbase={LEVEL_V2_WORDS_ROUTE} />,
    },
    {
        path: `${LEVEL_V2_WORDS_ROUTE}/:id`,
        Component: <TopicsPage linkbase={LEVEL_V2_WORDS_ROUTE} />,
    },
    {
        path: `${LEVEL_V2_WORDS_ROUTE}/:id/:topic`,
        Component: <TopicsPage linkbase={LEVEL_V2_WORDS_ROUTE} />,
    },
    // ---------------------
    {
        path: TOP1000_BASE_WORDS_ROUTE,
        Component: <TopThousandWordsPage />,
    },
    {
        path: ABOUT_APP_ROUTE,
        Component: <AboutTheApp />,
    },
]
