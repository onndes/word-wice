import * as React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Layout from './components/Layout'
import { ColorModeContext, useMode } from './theme/theme'

function App() {
    const [theme, colorMode] = useMode()
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
