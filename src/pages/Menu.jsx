import React from 'react'
import { Typography, Paper, useTheme, Container } from '@mui/material'
import ButtonToggleTheme from '../components/ButtonToggleTheme'
import LogOut from '../components/LogOut'
import { tokens } from '../theme/theme'

const Menu = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: '100%',
                gap: 1,
            }}
        >
            <Typography ml={2} mt={1} variant="h5" color="GrayText">
                Theme
            </Typography>
            <Paper
                elevation={1}
                sx={{
                    padding: 2,
                    width: '100%',
                    mb: 2,
                    mr: 2,
                    background: colors.primary[400],
                }}
            >
                <ButtonToggleTheme />
            </Paper>
            <Typography ml={2} mt={1} variant="h5" color="GrayText">
                Account
            </Typography>
            <Paper
                elevation={1}
                sx={{
                    padding: 2,
                    width: '100%',
                    mb: 2,
                    mr: 2,
                    background: colors.primary[400],
                }}
            >
                <LogOut />
            </Paper>
        </Container>
    )
}

export default Menu
