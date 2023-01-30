import {
    AppBar,
    Toolbar,
    useTheme,
} from '@mui/material'

import { tokens } from '../../../theme/theme'
import useIsOnline from '../../../hooks/useIsOnline'
import LogoBlock from '../LogoBlock'

export default function MyAppBarMobile() {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const isOnline = useIsOnline()

    return (
        <AppBar
            position="fixed"
            variant="persistent"
            color="primary"
            sx={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <LogoBlock isOnline={isOnline} />
            </Toolbar>
        </AppBar>
    )
}
