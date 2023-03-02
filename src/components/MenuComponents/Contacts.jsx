import * as React from 'react'
import EmailIcon from '@mui/icons-material/Email'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

export default function Contacts() {
    return (
        <ListItem disablePadding>
            <ListItemAvatar>
                <Avatar>
                    <EmailIcon color="error" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary="Email"
                secondary="wordwice@gmail.com"
                secondaryTypographyProps={{
                    sx: { color: 'text.primary', fontSize: '14px' },
                }}
                primaryTypographyProps={{
                    sx: { fontWeight: '600', fontSize: '15px' },
                }}
            />
        </ListItem>
    )
}
