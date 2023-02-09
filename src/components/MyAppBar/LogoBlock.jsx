import {
    Box,
    ListItemButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { WORDS_ROUTE } from '../../utils/consts'
import icon from '../../common/images/icon-72x72.png'
import DisplayOnline from '../DisplayOnline'

const LogoBlock = ({ isOnline }) => {
    const theme = useTheme()
    const mq = useMediaQuery('(max-width:900px)')

    return (
        <Link
            to={WORDS_ROUTE}
            style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                '&:active': { textDecoration: 'none' },
            }}
        >
            <ListItemButton disableGutters dense>
                <img width={mq ? '53px' : '63px'} src={icon} alt="" />
                <Box>
                    <Typography
                        variant={mq ? 'h5' : 'h3'}
                        noWrap
                        component="p"
                        sx={{ letterSpacing: 1 }}
                    >
                        WordWice
                    </Typography>
                    <DisplayOnline isOnline={isOnline} />
                </Box>
            </ListItemButton>
        </Link>
    )
}

export default LogoBlock
