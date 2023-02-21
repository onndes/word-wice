import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'
import AppRouter from '../AppRouter'
import MyAppBar from './MyAppBar/MyAppBar'
import { useAuth } from '../hooks/useAuth'
import MyAppBarMobile from './MyAppBar/Mobile/MyAppBarMobile'
import useMyTheme from '../hooks/useMyTheme'


const Indent = styled('div')(({ mq, bottom }) => ({
    paddingTop: mq ? '60px' : '72px',
    paddingBottom: mq && bottom ? '5px' : 1,
}))

export default function Layout() {
    const { mq } = useMyTheme()
    const { isAuth } = useAuth()

    return (
        <>
            <CssBaseline />
            {isAuth && <MyAppBar />}
            {mq && <MyAppBarMobile />}
            <Indent mq={mq} />
            <Container
                maxWidth="md"
                sx={() => ({
                    height: '100%',
                    pt: mq ? 2 : 2,
                    pb: mq ? 2 : 1,
                })}
            >
                <AppRouter />
            </Container>
            <Indent mq={mq} bottom />
        </>
    )
}
