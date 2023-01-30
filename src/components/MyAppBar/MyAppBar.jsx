import {
    AppBar,
    Box,
    ListItemButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { tokens } from '../../theme/theme'
import DrawerMenu from './Menu'
import icon from '../../common/images/icon-144x144.png'
import { VOCABULARY_ROUTE } from '../../utils/consts'
import LogOut from './LogOut'
import useIsOnline from '../../hooks/useIsOnline'
import DisplayOnline from '../DisplayOnline'

const MyAppBar = () => {
    const maxWith = useMediaQuery('(max-width:900px)')
    const { isAuth } = useAuth()
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
                top: maxWith && 'auto',
                bottom: maxWith && 0,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: maxWith && 'column',
                    alignItems: maxWith && 'stretch',
                }}
            >
                {!maxWith && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            to={VOCABULARY_ROUTE}
                            style={{
                                color: theme.palette.text.primary,
                                textDecoration: 'none',
                                '&:active': { textDecoration: 'none' },
                            }}
                        >
                            <ListItemButton disableGutters dense>
                                <img width="50px" src={icon} alt="" />
                                <Box>
                                    <Typography
                                        variant="h3"
                                        noWrap
                                        component="p"
                                        sx={{ letterSpacing: 1 }}
                                    >
                                        WordWice
                                    </Typography>
                                    <DisplayOnline isOnline={isOnline}/>
                                </Box>
                            </ListItemButton>
                        </Link>
                    </Box>
                )}

                {isAuth && <DrawerMenu />}
                {isAuth && !maxWith && <LogOut />}
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar
