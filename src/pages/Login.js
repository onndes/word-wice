import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grid, Button, Box, useTheme } from '@mui/material'
import { getAuthUser } from '../redux/slices/userSlice/userAsync'
import { tokens } from '../theme/theme'

export default function Login() {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
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
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: '20px',
                            '&:hover': {
                              backgroundColor: colors.blueAccent[800]
                            },
                        }}
                        onClick={() => dispatch(getAuthUser())}
                    >
                        login with google
                    </Button>
                </Box>
            </Grid>
        </Container>
    )
}
