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
    setIsOnline,
    setUserSettings,
} from './redux/slices/settingsAppSlice/settingsAppSlice'
import { collectionNameWords, knowWord } from './utils/consts'
import {
    handleStatus,
    selectAllWords,
    setWords,
} from './redux/slices/wordsSlice/wordsSlice'
import { handleDuplicateWords } from './utils/handleDuplicateWords'
import { deleteWords, subWords } from './redux/slices/wordsSlice/wordsAsync'
import { subAppSettings } from './redux/slices/settingsAppSlice/settingsAppAsync'

const unSubs = []

function App() {
    const [theme, colorMode] = useMode()
    const words = useSelector(selectAllWords())
    const variant = useSelector(
        ({ settingsApp }) => settingsApp.user.variantDelDuplicate
    )
    const [isAuth, setIsAuth] = React.useState(false)
    const isOnline = useIsOnline()
    const dispatch = useDispatch()

    const auth = getAuth()

    // check duplicate -
    // (it will take place due to the fact that the
    //  application was autonomous, and then synchronized)
    React.useEffect(() => {
        if (words.length) {
            const duplicates = handleDuplicateWords(words, variant).duplicate
            duplicates.forEach((el) => {
                let name = ''
                if (el.knowledge === knowWord.A0.code) {
                    name = collectionNameWords.NEW
                } else if (el.knowledge === knowWord.C2.code) {
                    name = collectionNameWords.LEARNED
                } else {
                    name = collectionNameWords.IN_PROCESS
                }

                dispatch(
                    deleteWords({
                        collectionName: name,
                        word: el,
                    })
                )
            })
        }
    }, [words])

    React.useEffect(() => {
        dispatch(setIsOnline(isOnline))
    }, [isOnline])

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                dispatch(removeUser())
                if (unSubs) {
                    unSubs.forEach((unSub) => unSub())
                }
            } else {
                dispatch(setUser(user))

                const id = auth.currentUser.uid
                unSubs.push(
                    subAppSettings(dispatch, id, handleStatus, setUserSettings)
                )

                subWords(dispatch, id, handleStatus, setWords).forEach(
                    (unSub) => unSubs.push(unSub)
                )
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
