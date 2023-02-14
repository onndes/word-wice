import { useSelector } from 'react-redux'
import { alpha, AppBar, Toolbar } from '@mui/material'
import useIsOnline from '../../../hooks/useIsOnline'
import LogoBlock from '../LogoBlock'
import ToolbarWordsCards from './ToolbarWordsCards'

export default function MyAppBarMobile() {
    const isOnline = useIsOnline()
    const { selected } = useSelector(({ settingsApp }) => settingsApp.wordsList)

    return (
        <AppBar
            position="fixed"
            variant="persistent"
            color="primary"
            sx={(theme) => ({
                backgroundColor: alpha(theme.palette.background.main, 0.85),
                backdropFilter: 'blur(3px)',
                color: theme.palette.text.primary,
                height: '60px',
                zIndex: 1000,
                borderBottom:
                    theme.palette.mode === 'light'
                        ? '1px solid lightGrey'
                        : null,
            })}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {selected.length ? (
                    <ToolbarWordsCards />
                ) : (
                    <LogoBlock isOnline={isOnline} />
                )}
            </Toolbar>
        </AppBar>
    )
}
