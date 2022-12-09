import { CssBaseline, ThemeProvider, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import MyAppBar from './components/MyAppBar'
import MyDrawer from './components/MyDrawer'
import { ColorModeContext, useMode } from './theme/theme'

function App() {
    const [theme, colorMode] = useMode()
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                    <MyDrawer />
                </div>

                {/* <Grid container className="App" style={{ minWidth: '100%' }}>
                    <Grid item style={{ minWidth: '200px' }} md={2}>
                        App
                    </Grid>
                    <Grid item md={10}>
                        <MyAppBar />
                    </Grid>
                </Grid> */}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
