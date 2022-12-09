// import * as React from 'react'
// import AppBar from '@mui/material/AppBar'
// import Box from '@mui/material/Box'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'
// import Brightness4Icon from '@mui/icons-material/Brightness4'
// import Brightness7Icon from '@mui/icons-material/Brightness7'
// import { useTheme } from '@mui/material/styles'
// import { ColorModeContext } from '../theme/theme'
// const DRAWER_WIDTH = 240
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { DRAWER_WIDTH } from '../utils/consts'

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

export default function MyAppBar({ handleDrawerOpen, open }) {
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        MyVocabulary
                    </Typography>
                </Box>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}
