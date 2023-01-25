import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grid, Button, Box, useTheme } from '@mui/material'
import { getAuthUser } from '../redux/slices/userSlice/userAsync'
import { tokens } from '../theme/theme'
import icon from '../common/images/icon-512x512.png'

export default function Login() {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const dispatch = useDispatch()
    return (
        <Container fixed maxWidth="lg">
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center',
                }}
            >
                <img width="250px" src={icon} alt="" />
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                        backgroundColor: "#FAF3EB",
                        color: "#D43619",
                        fontSize: '20px',
                        '&:hover': {
                            backgroundColor: "#ede0d0",
                        },
                        borderRadius: '30px'
                    }}
                    onClick={() => dispatch(getAuthUser())}
                >
                    login with google
                </Button>
            </Box>
        </Container>
    )
}
