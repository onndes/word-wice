import { AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material'

import { tokens } from '../../theme/theme'
import Menu from './Menu'
import LogOut from './LogOut'
import useIsOnline from '../../hooks/useIsOnline'
import LogoBlock from './LogoBlock'

const MyAppBar = () => {
    const mq = useMediaQuery('(max-width:900px)')
    const isOnline = useIsOnline()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <AppBar
            position="fixed"
            variant="persistent"
            color="primary"
            sx={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
                top: mq && 'auto',
                bottom: mq && 0,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: mq && 'column',
                    alignItems: mq && 'stretch',
                }}
            >
                {!mq && <LogoBlock isOnline={isOnline} />}
                <Menu />
                {!mq && <LogOut />}
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar
