import { Box, Typography } from '@mui/material'
import React from 'react'
import SyncIcon from '@mui/icons-material/Sync'
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled'

const DisplayOnline = ({ isOnline }) => {
    return (
        <Box
            sx={() => ({
                color: isOnline ? 'green' : 'red',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                gap: 0.5,
            })}
        >
            {isOnline ? <SyncIcon /> : <SyncDisabledIcon />}
            <Typography
                fontSize="13px"
                noWrap
                component="p"
                letterSpacing=".2px"
                lineHeight={1}
                pt="1px"
            >
                {isOnline ? 'sync on' : 'sync off'}
            </Typography>
        </Box>
    )
}

export default DisplayOnline
