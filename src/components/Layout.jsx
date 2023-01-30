import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'
import AppRouter from '../AppRouter'
import MyAppBar from './MyAppBar/MyAppBar'
import { useAuth } from '../hooks/useAuth'
import MyAppBarMobile from './MyAppBar/Mobile/MyAppBarMobile'
import useMyTheme from '../hooks/useMyTheme'

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

export default function Layout() {
    const { mq } = useMyTheme()
    const { isAuth } = useAuth()

    return (
        <>
            <CssBaseline />
            {isAuth && <MyAppBar />}
            {mq && <MyAppBarMobile />}
            <DrawerHeader />
            <Container
                maxWidth="md"
                sx={{ mt: mq ? 2 : 3.5, pb: mq ? 10 : 1, pt: mq && 0.5 }}
            >
                <AppRouter />
            </Container>
        </>
    )
}
