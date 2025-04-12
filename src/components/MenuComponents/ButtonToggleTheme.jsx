import React from 'react'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { ColorModeContext } from '../../theme/theme'
import useMyTheme from '../../hooks/useMyTheme'
import { MaterialUISwitch } from './MaterialUISwitch'

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

            {/* New switcher - test */}
            <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                // label="MUI switch"
                checked={theme.palette.mode === 'dark'}
                onChange={colorMode.toggleColorMode}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ margin: 0 }}
            />

            {/* Old switcher */}
            {/* <Switch
                color="secondary"
                checked={theme.palette.mode === 'dark'}
                onChange={colorMode.toggleColorMode}
                inputProps={{ 'aria-label': 'controlled' }}
            /> */}
        </Box>
    )
}
