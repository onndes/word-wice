import React from 'react'
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'

export default function ListItemDrawer({ children, text }) {
    return (
        <ListItem key={text} disablePadding>
            <ListItemButton>
                <ListItemIcon>{children}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
}
