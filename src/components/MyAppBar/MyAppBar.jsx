import { alpha, AppBar, Toolbar, Typography } from '@mui/material'
import Menu from './Menu'
import useIsOnline from '../../hooks/useIsOnline'
import LogoBlock from './LogoBlock'
import { useAuth } from '../../hooks/useAuth'
import useMyTheme from '../../hooks/useMyTheme'

const MyAppBar = () => {
    const isOnline = useIsOnline()
    const { mq, theme } = useMyTheme()
    const { email } = useAuth()

    return (
        <AppBar
            position="fixed"
            variant="persistent"
            color="primary"
            sx={(theme) => ({
                backgroundColor: alpha(theme.palette.background.main, 0.85),
                backdropFilter: 'blur(3px)',
                top: mq && 'auto',
                bottom: mq && 0,
                // minHeight: 'auto',
                // alignItems: 'center',
                // paddingBottom: mq ? 'env(safe-area-inset-bottom)' : 0,
                // height: mq ? 'auto' : undefined,
            })}
        >
            <Toolbar
                disableGutters={mq}
                sx={{
                    [`border${mq ? 'Top' : 'Bottom'}`]:
                        theme.palette.mode === 'light' && '1px solid lightGrey',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: mq && 'column',
                    minHeight: 'auto',
                    paddingBottom: mq ? 'env(safe-area-inset-bottom)' : 0,
                    alignItems: mq && 'stretch',
                    // backdropFilter: 'blur(6px)',
                    // paddingTop: mq ? 6 : 1,
                }}
            >
                {!mq && <LogoBlock isOnline={isOnline} />}
                <Menu />
                {!mq && (
                    <Typography
                        variant="h6"
                        noWrap
                        component="p"
                        mr={2}
                        color="text.primary"
                    >
                        {email}
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar
