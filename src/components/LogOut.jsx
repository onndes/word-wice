import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/useAuth'
import useMyTheme from '../hooks/useMyTheme'
import { logOutUser } from '../redux/slices/userSlice/userAsync'

const LogOut = () => {
    const { email } = useAuth()
    const { colors } = useMyTheme()
    const dispatch = useDispatch()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="h6" noWrap component="p" mr={2}>
                {email}
            </Typography>
            <Button
                sx={{
                    backgroundColor: colors.redAccent[600],
                    color: colors.grey[100],
                    '&:hover': {
                        backgroundColor: colors.redAccent[700],
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
