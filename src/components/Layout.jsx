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
    // eslint-disable-next-line no-nested-ternary
    paddingTop: mq && !bottom ? '60px' : bottom ? '0px' : '72px',
    paddingBottom: mq && bottom ? '96px' : 1,
}))

const LayoutWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
})

const ContentWrapper = styled('div')({
    flexGrow: 1, // Контент будет занимать всё пространство
    // paddingBottom: '60px',
})

export default function Layout() {
    const { mq } = useMyTheme()
    const { isAuth } = useAuth()

    return (
        <LayoutWrapper>
            <CssBaseline />
            {isAuth && <MyAppBar />}
            {isAuth && mq && <MyAppBarMobile />}
            <Indent mq={mq} />
            <ContentWrapper>
                <Container
                    maxWidth="md"
                    sx={{
                        height: '100%',
                        pt: mq ? 2 : 2,
                        pb: mq ? 2 : 1,
                    }}
                >
                    <AppRouter />
                </Container>
            </ContentWrapper>
            <Indent mq={mq} bottom />
        </LayoutWrapper>
    )
}
