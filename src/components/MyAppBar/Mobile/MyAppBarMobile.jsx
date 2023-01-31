import { useSelector } from 'react-redux'
import {
    AppBar,
    Toolbar,
} from '@mui/material'
import useIsOnline from '../../../hooks/useIsOnline'
import LogoBlock from '../LogoBlock'
import useMyTheme from '../../../hooks/useMyTheme'
import ToolbarWordsCards from './ToolbarWordsCards'

export default function MyAppBarMobile() {
    const { colors } = useMyTheme()
    const isOnline = useIsOnline()
    const { selected } = useSelector(({ settingsApp }) => settingsApp.wordsList)

    return (
        <AppBar
            position="fixed"
            variant="persistent"
            color="primary"
            sx={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
                height: '60px',
                zIndex: 1000
            }}
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
