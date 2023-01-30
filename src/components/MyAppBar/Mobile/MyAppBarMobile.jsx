import {
    AppBar,
    Toolbar,
} from '@mui/material'

import useIsOnline from '../../../hooks/useIsOnline'
import LogoBlock from '../LogoBlock'
import useMyTheme from '../../../hooks/useMyTheme'

export default function MyAppBarMobile() {
  const { colors } = useMyTheme()
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
