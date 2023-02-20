import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { alpha, AppBar, Box, Toolbar } from '@mui/material'
import useIsOnline from '../../../hooks/useIsOnline'
import LogoBlock from '../LogoBlock'
import ToolbarWordsCards from './ToolbarWordsCards'
import OptionsMenu from './OptionsMenu/OptionsMenu'
import { WORDS_ROUTE } from '../../../utils/consts'

export default function MyAppBarMobile() {
    const isOnline = useIsOnline()
    const { selected } = useSelector(({ settingsApp }) => settingsApp.wordsList)
    const { pathname } = useLocation()

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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {!selected.length && <Box width="36px" />}
                {selected.length ? (
                    <ToolbarWordsCards />
                ) : (
                    <LogoBlock isOnline={isOnline} />
                )}

                {pathname === WORDS_ROUTE && !selected.length && (
                    <OptionsMenu />
                )}
                {pathname !== WORDS_ROUTE && <Box width="36px" />}
            </Toolbar>
        </AppBar>
    )
}
