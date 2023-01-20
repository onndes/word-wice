import React from 'react'
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

export default function ListItemDrawer({ icon, text, to }) {
    const theme = useTheme()
    
    return (
        <Link
            to={to}
            style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                '&:active': { textDecoration: 'none' },
            }}
        >
            <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>{icon()}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        </Link>
    )
}
