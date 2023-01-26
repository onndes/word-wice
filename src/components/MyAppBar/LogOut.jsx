import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'
import { logOutUser } from '../../redux/slices/userSlice/userAsync'
import { tokens } from '../../theme/theme'

const LogOut = () => {
    const { email } = useAuth()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const dispatch = useDispatch()
    return (
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
    )
}

export default LogOut
