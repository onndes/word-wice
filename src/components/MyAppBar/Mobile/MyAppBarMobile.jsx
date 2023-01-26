import {
    AppBar,
    ListItemButton,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material'

import { Link } from 'react-router-dom'
import { tokens } from '../../../theme/theme'
import icon from '../../../common/images/icon-144x144.png'
import { VOCABULARY_ROUTE } from '../../../utils/consts'

export default function MyAppBarMobile() {
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
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
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
                        <img width="40px" src={icon} alt="" />
                        <Typography
                            variant="h4"
                            noWrap
                            component="p"
                            sx={{ letterSpacing: 1 }}
                        >
                            WordWice
                        </Typography>
                    </ListItemButton>
                </Link>
            </Toolbar>
        </AppBar>
    )
}
