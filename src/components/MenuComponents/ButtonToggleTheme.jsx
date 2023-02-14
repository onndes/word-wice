import React from 'react'
import { Box, Switch } from '@mui/material'

import { ColorModeContext } from '../../theme/theme'
import useMyTheme from '../../hooks/useMyTheme'

export default function ButtonToggleTheme() {
    const { theme, t } = useMyTheme()
    const colorMode = React.useContext(ColorModeContext)

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
        >
            {t('Dark mode')}
            <Switch
                color="secondary"
                checked={theme.palette.mode === 'dark'}
                onChange={colorMode.toggleColorMode}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    )
}
