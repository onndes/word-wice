import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import {
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'

import { DRAWER_WIDTH } from '../utils/consts'
import { useAuth } from '../hooks/useAuth'
import { logOutUser } from '../redux/slices/userSlice'
import { tokens } from '../theme/theme'

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

export default function MyAppBar({ handleDrawerOpen, open }) {
    const dispatch = useDispatch()
    const { isAuth, email } = useAuth()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <AppBar
            position="fixed"
            open={open}
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
                    {isAuth && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h4" noWrap component="p">
                        MyVocabulary
                    </Typography>
                </Box>
                {isAuth ? (
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
                ) : (
                    <Button color="inherit">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}
