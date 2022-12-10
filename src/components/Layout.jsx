import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'

import { DRAWER_WIDTH } from '../utils/consts'
import AppRouter from './AppRouter'
import MyAppBar from './MyAppBar'
import { MyDrawer, DrawerHeader } from './MyDrawer'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${DRAWER_WIDTH}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
)

export default function Layout() {
    const [open, setOpen] = React.useState(true)
    const user = false
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MyAppBar
                handleDrawerOpen={handleDrawerOpen}
                open={open && user}
                user={user}
            />
            <MyDrawer
                handleDrawerClose={handleDrawerClose}
                open={open && user}
            />
            <Main open={open && user}>
                <DrawerHeader />
                <AppRouter />
            </Main>
        </Box>
    )
}
