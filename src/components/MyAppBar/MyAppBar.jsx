import { AppBar, Toolbar, Typography } from '@mui/material'
import Menu from './Menu'
import useIsOnline from '../../hooks/useIsOnline'
import LogoBlock from './LogoBlock'
import { useAuth } from '../../hooks/useAuth'
import useMyTheme from '../../hooks/useMyTheme'

const MyAppBar = () => {
    const isOnline = useIsOnline()
    const { mq, colors } = useMyTheme()
    const { email } = useAuth()

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
                {!mq && (
                    <Typography variant="h6" noWrap component="p" mr={2}>
                        {email}
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar
