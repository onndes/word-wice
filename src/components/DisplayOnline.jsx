import { Box, Typography } from '@mui/material'
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle'

const DisplayOnline = ({ isOnline }) => {
    return (
        <Box
            sx={{
                color: isOnline ? 'lightGreen' : 'red',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
            }}
        >
            <CircleIcon fontSize="" />
            <Typography variant="h6" noWrap component="p" letterSpacing=".2px">
                {isOnline ? 'online' : 'offline'}
            </Typography>
        </Box>
    )
}

export default DisplayOnline
