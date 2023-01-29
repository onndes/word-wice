import * as React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { disableNetwork, enableNetwork } from '@firebase/firestore'

import Layout from './components/Layout'
import { ColorModeContext, useMode } from './theme/theme'
import { removeUser, setUser } from './redux/slices/userSlice/userSlice'
import LoaderPage from './components/LoaderPage/LoaderPage'
import { db } from './firebase'

function App() {
    const [theme, colorMode] = useMode()
    const [isAuth, setIsAuth] = React.useState(false)
    const [isOnline, setIsOnline] = React.useState(navigator.onLine)
    const dispatch = useDispatch()

    const auth = getAuth()

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                dispatch(removeUser())
            } else {
                dispatch(setUser(user))
            }
            setIsAuth(true)
        })
    }, [])
    React.useEffect(() => {
        function handleOnline() {
            setIsOnline(true)
        }

        function handleOffline() {
            setIsOnline(false)
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

  
    console.log(isOnline)
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
