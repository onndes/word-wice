import React from 'react'
import { Typography, Paper, Container, styled } from '@mui/material'
import ButtonToggleTheme from '../components/ButtonToggleTheme'
import LogOut from '../components/LogOut'
import { tokens } from '../theme/theme'
import DisplayWords from '../components/MenuComponents/DisplayWords'
import useMyTheme from '../hooks/useMyTheme'

const Title = styled(Typography)(({ theme }) => ({
    marginLeft: theme.spacing(1.5),
    color: 'GrayText',
}))

const Block = styled(Paper, { shouldForwardProp: () => ({ elevation: 24 }) })(
    ({ theme }) => ({
        padding: theme.spacing(1.5),
        width: '100%',
        background: tokens(theme.palette.mode).primary[400],
    })
)

const Menu = () => {
    const { mq } = useMyTheme()
    return (
        <Container
            disableGutters
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: '100%',
                gap: 1,
            }}
        >
            <Title variant="h5">Theme</Title>
            <Block elevation={1}>
                <ButtonToggleTheme />
            </Block>
            {mq && (
                <>
                    <Title variant="h5">Display words</Title>
                    <Block elevation={1}>
                        <DisplayWords />
                    </Block>
                </>
            )}
            <Title variant="h5">Account</Title>
            <Block elevation={1}>
                <LogOut />
            </Block>
        </Container>
    )
}

export default Menu
