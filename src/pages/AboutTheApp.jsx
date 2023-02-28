import { Box, Container } from '@mui/material'
import React from 'react'
import { WelcomeModalItems } from '../components/WelcomeModal'

const AboutTheApp = () => {
    return (
        <Container maxWidth="sm" disableGutters>
            <Box pb={10}>
                <WelcomeModalItems />
            </Box>
        </Container>
    )
}

export default AboutTheApp
