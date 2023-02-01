import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import useMyTheme from '../../hooks/useMyTheme'

const Started = ({ handle }) => {
    const { colors } = useMyTheme()
    return (
        <Box sx={{ maxWidth: '400px', margin: '0 auto ' }}>
            <Typography variant="h4" color="" mb={3}>
                Learn new words
            </Typography>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                    background: colors.primary[400],
                    maxWidth: '400px',
                    margin: '0 auto ',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ padding: '20px' }} textAlign="center">
                    <Button
                        onClick={handle}
                        variant="contained"
                        color="success"
                        display="flex"
                    >
                        Learn new words!
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Started
