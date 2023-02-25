import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Box } from '@mui/material'
import { getAuthUser } from '../redux/slices/userSlice/userAsync'
import icon from '../assets/images/icon-256x256.png'

export default function Login() {
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
                <img width="250px" height="250px" src={icon} alt="" />
                <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                        backgroundColor: '#FAF3EB',
                        color: '#D43619',
                        fontSize: '20px',
                        '&:hover': {
                            backgroundColor: '#ede0d0',
                        },
                        borderRadius: '30px',
                    }}
                    onClick={() => dispatch(getAuthUser())}
                >
                    login with google
                </Button>
            </Box>
        </Container>
    )
}
