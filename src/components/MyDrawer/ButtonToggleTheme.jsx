import React from 'react'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { Box, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { ColorModeContext } from '../../theme/theme'

export default function ButtonToggleTheme() {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)

    return (
        <Box sx={{ display: 'flex', height: '50px' }}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    borderRadius: 1,
                    p: 3,
                }}
            >
                {theme.palette.mode} mode
                <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                >
                    {theme.palette.mode === 'dark' ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
            </Box>
        </Box>
    )
}
