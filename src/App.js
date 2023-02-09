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

const unSubs = []

function App() {
    const [theme, colorMode] = useMode()
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

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {isAuth ? <Layout /> : <LoaderPage />}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
