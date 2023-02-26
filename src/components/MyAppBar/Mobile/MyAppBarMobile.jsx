import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { alpha, AppBar, Box, Toolbar, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import useIsOnline from '../../../hooks/useIsOnline'
import LogoBlock from '../LogoBlock'
import ToolbarWordsCards from './ToolbarWordsCards'
import OptionsMenu from './OptionsMenu/OptionsMenu'
import { WORDS_ROUTE } from '../../../common/consts/ROUTES'

export default function MyAppBarMobile() {
    const isOnline = useIsOnline()
    const { selected } = useSelector(({ settingsApp }) => settingsApp.wordsList)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const pathSplit = pathname.split('/')
    const pathLength = pathSplit.length
    const backPage = pathSplit.slice(0, pathLength - 1).join('/')

    const isVisibleBtnBack = pathLength > 2 && !selected.length

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
                {!selected.length && !isVisibleBtnBack && <Box width="36px" />}
                {isVisibleBtnBack && (
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        aria-label="back"
                        onClick={() => navigate(backPage)}
                        p={2}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                )}

                {selected.length ? (
                    <ToolbarWordsCards />
                ) : (
                    <LogoBlock isOnline={isOnline} />
                )}

                {pathname === WORDS_ROUTE && !selected.length && (
                    <OptionsMenu />
                )}
                {pathname !== WORDS_ROUTE && !isVisibleBtnBack && (
                    <Box width="36px" />
                )}
                {isVisibleBtnBack && <Box width="36px" />}
            </Toolbar>
        </AppBar>
    )
}
