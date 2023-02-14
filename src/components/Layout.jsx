import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'
import AppRouter from '../AppRouter'
import MyAppBar from './MyAppBar/MyAppBar'
import { useAuth } from '../hooks/useAuth'
import MyAppBarMobile from './MyAppBar/Mobile/MyAppBarMobile'
import useMyTheme from '../hooks/useMyTheme'

export const DrawerHeader = styled('div')(({ mq }) => ({
    paddingTop: mq ? '60px' : '72px',
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
            <DrawerHeader mq={mq} />
            <Container
                maxWidth="md"
                sx={() => ({
                    height: '100%',
                    mt: mq ? 1 : 2,
                    pb: mq ? 10 : 1,
                    pt: mq && 0.5,
                })}
            >
                <AppRouter />
                <Box sx={{ paddingBottom: '1px' }} />
            </Container>
        </>
    )
}
