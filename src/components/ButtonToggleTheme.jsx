import React from 'react'
import { Box, Switch } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { ColorModeContext } from '../theme/theme'

export default function ButtonToggleTheme() {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            Dark mode
            <Switch
                color="secondary"
                checked={theme.palette.mode === 'dark'}
                onChange={colorMode.toggleColorMode}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    )
}
