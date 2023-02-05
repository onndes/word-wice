import * as React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { query, onSnapshot, doc } from 'firebase/firestore'

import Layout from './components/Layout'
import { ColorModeContext, useMode } from './theme/theme'
import { removeUser, setUser } from './redux/slices/userSlice/userSlice'
import LoaderPage from './components/LoaderPage/LoaderPage'
import useIsOnline from './hooks/useIsOnline'
import { setIsOnline } from './redux/slices/settingsAppSlice/settingsAppSlice'
import { collectionNameWords } from './utils/consts'
import { db } from './firebase'
import { handleStatus, setWords } from './redux/slices/wordsSlice/wordsSlice'
import { STATUS } from './utils/handleStatus'

const unSubs = []

function App() {
    const [theme, colorMode] = useMode()
    const [isAuth, setIsAuth] = React.useState(false)
    const [uId, setUId] = React.useState(null)
    const isOnline = useIsOnline()
    const dispatch = useDispatch()

    const auth = getAuth()

    React.useEffect(() => {
        dispatch(setIsOnline(isOnline))
    }, [isOnline])

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            dispatch(removeUser())
            if (unSubs) {
                unSubs.forEach((unSub) => unSub())
            }
        } else {
            setUId(user.uid)
            dispatch(setUser(user))
        }
        setIsAuth(true)
    })

    React.useEffect(() => {
        if (uId) {
            const inquiry = Object.values(collectionNameWords)

            const qsWords = inquiry.map((el) =>
                query(doc(db, el, auth.currentUser.uid))
            )
            const qsUsers = query(doc(db, 'users', auth.currentUser.uid))

            dispatch(
                handleStatus({
                    nameCollection: 'userSettings',
                    status: STATUS.loading,
                })
            )
            unSubs.push(
                onSnapshot(
                    qsUsers,
                    { includeMetadataChanges: true },
                    (snapshot) => {
                        dispatch(setWords(snapshot.data().settings))
                        dispatch(
                            handleStatus({
                                nameCollection: 'userSettings',
                                status: STATUS.success,
                            })
                        )
                    }
                )
            )
            qsWords.forEach((q, idx) => {
                dispatch(
                    handleStatus({
                        nameCollection: inquiry[idx],
                        status: STATUS.loading,
                    })
                )
                unSubs.push(
                    onSnapshot(
                        q,
                        { includeMetadataChanges: true },
                        (snapshot) => {
                            const data = snapshot.data()
                            dispatch(setWords(data))
                            dispatch(
                                handleStatus({
                                    nameCollection: inquiry[idx],
                                    status: STATUS.success,
                                })
                            )
                        }
                    )
                )
            })
        }

        return () => uId && unSubs.forEach((unSub) => unSub())
    }, [uId, auth])

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
