import MuiAppBar from '@mui/material/AppBar'
import {
    Box,
    Button,
    ListItemButton,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { logOutUser } from '../../redux/slices/userSlice/userAsync'
import { tokens } from '../../theme/theme'
import DrawerMenu from './Menu'
import icon from '../../common/images/icon-144x144.png'
import { VOCABULARY_ROUTE } from '../../utils/consts'

export default function MyAppBar() {
    const dispatch = useDispatch()
    const { isAuth, email } = useAuth()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <MuiAppBar
            position="fixed"
            variant="persistent"
            sx={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
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
                            <Typography
                                variant="h3"
                                noWrap
                                component="p"
                                sx={{ letterSpacing: 1 }}
                            >
                                WordWice
                            </Typography>
                        </ListItemButton>
                    </Link>
                </Box>

                {isAuth && <DrawerMenu />}

                {isAuth && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" noWrap component="p" mr={2}>
                            {email}
                        </Typography>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                '&:hover': {
                                    backgroundColor: colors.blueAccent[800],
                                },
                            }}
                            onClick={() => dispatch(logOutUser())}
                        >
                            Log out
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </MuiAppBar>
    )
}
