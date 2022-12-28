import * as React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'

import Layout from './components/Layout'
import { ColorModeContext, useMode } from './theme/theme'
import { removeUser } from './redux/slices/userSlice/userSlice'

function App() {
    const [theme, colorMode] = useMode()
    const dispatch = useDispatch()

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
        if (!user) dispatch(removeUser())
    })

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme} >
                <CssBaseline enableColorScheme />
                <Layout />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
