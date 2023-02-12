import { Box, Button, Paper } from '@mui/material'
import React from 'react'
import useMyTheme from '../../hooks/useMyTheme'

const Started = ({ handle }) => {
    const { colors } = useMyTheme()
    return (
        <Box sx={{ maxWidth: '400px', margin: '0 auto ' }}>
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
                        size="large"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: 1,
                            color: 'white',
                        }}
                    >
                        Start!
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Started
