import * as React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import Layout from './components/Layout'
import { ColorModeContext, useMode } from './theme/theme'
import { removeUser, setUser } from './redux/slices/userSlice/userSlice'
import LoaderPage from './components/LoaderPage/LoaderPage'
import useIsOnline from './hooks/useIsOnline'
import {
    removeUserSA,
    setIsOnline,
    setUserSettings,
} from './redux/slices/settingsAppSlice/settingsAppSlice'
import { handleStatus, setWords } from './redux/slices/wordsSlice/wordsSlice'
import { subWords } from './redux/slices/wordsSlice/wordsAsync'
import { subAppSettings } from './redux/slices/settingsAppSlice/settingsAppAsync'
import './index.css'
import './i18n'
import WelcomeModal from './components/WelcomeModal'

const unSubs = []

function App() {
    const [theme, colorMode] = useMode()

    // variantDelDuplicate выбор варианта
    // для удаления дубликатов, при появлении из-за
    // одновременной работы онлайн и оффлайн
    const { variantDelDuplicate } = useSelector(
        ({ settingsApp }) => settingsApp.user
    )

    const [isAuth, setIsAuth] = React.useState(false)
    const isOnline = useIsOnline()
    const dispatch = useDispatch()

    const auth = getAuth()

    React.useEffect(() => {
        dispatch(setIsOnline(isOnline))
    }, [isOnline])

    React.useEffect(() => {
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
        if (!isIOS) {
            return undefined
        }

        let previousHeight = window.visualViewport?.height || 0

        const fixResize = () => {
            if (window.visualViewport.height > previousHeight) {
                window.scrollTo(0, 0)
                document.getElementById('root').style.height = '100%'
            }
            previousHeight = window.visualViewport.height
        }

        window.visualViewport?.addEventListener('resize', fixResize)

        return () => {
            window.visualViewport?.removeEventListener('resize', fixResize)
        }
    }, [])

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                dispatch(removeUser())
                dispatch(removeUserSA())
                if (unSubs) {
                    unSubs.forEach((unSub) => unSub())
                }
            } else {
                dispatch(setUser(user))

                const id = auth.currentUser.uid
                unSubs.push(
                    subAppSettings(dispatch, id, handleStatus, setUserSettings)
                )

                subWords(
                    dispatch,
                    id,
                    handleStatus,
                    setWords,
                    variantDelDuplicate
                ).forEach((unSub) => unSubs.push(unSub))
            }
            setIsAuth(true)
        })
    }, [])

    const checkWelcomeModal = window.localStorage.getItem('WelcomeModal')

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {isAuth ? <Layout /> : <LoaderPage />}
                {!checkWelcomeModal && <WelcomeModal />}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
