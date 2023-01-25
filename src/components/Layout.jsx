import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'
import AppRouter from '../AppRouter'
import MyAppBar from './MyAppBar/MyAppBar'
import { useAuth } from '../hooks/useAuth'

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

export default function Layout() {
    const { isAuth } = useAuth()

    return (
        <>
            <CssBaseline />
            {isAuth && <MyAppBar />}
            <DrawerHeader />
            <Container maxWidth="md" sx={{ mt: 2 }}>
                <AppRouter />
            </Container>
        </>
    )
}
