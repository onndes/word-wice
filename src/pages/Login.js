import React from 'react'
import { Container, Grid, Button, Box } from '@mui/material'

export default function Login() {
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
                        color="neutral"
                        sx={{ fontSize: '18px' }}
                    >
                        login with google
                    </Button>
                </Box>
            </Grid>
        </Container>
    )
}
