import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'

import ButtonToggleTheme from './ButtonToggleTheme'

import { DRAWER_WIDTH } from '../utils/consts'
import DrawerMenu from './DrawerMenu'
import { tokens } from '../theme/theme'

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

export function MyDrawer({ handleDrawerClose, open }) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Drawer
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
            }}
            PaperProps={{
                sx: {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    backgroundColor: colors.primary[400],
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader color="secondary">
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <ButtonToggleTheme />
            <Divider />
            <DrawerMenu />
        </Drawer>
    )
}
