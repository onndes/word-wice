import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import ButtonToggleTheme from '../components/ButtonToggleTheme'
import LogOut from '../components/MyAppBar/LogOut'

const Menu = () => {
    const mq = useMediaQuery('(max-width:900px)')
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: '100%',
                gap: 1,
            }}
        >
            <ButtonToggleTheme />
            {mq && <LogOut />}
        </Box>
    )
}

export default Menu
