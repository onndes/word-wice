import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grid, Button, Box } from '@mui/material'
import { getAuthUser } from '../redux/slices/userSlice'

export default function Login() {
    const dispatch = useDispatch()
    return (
        <Container>
            <Grid
                container
                style={{}}
                sx={{
                    margin: '100px 0px 0px 0px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Button
                        variant="contained"
                        sx={{ fontSize: '18px' }}
                        onClick={() => dispatch(getAuthUser())}
                    >
                        login with google
                    </Button>
                </Box>
            </Grid>
        </Container>
    )
}
