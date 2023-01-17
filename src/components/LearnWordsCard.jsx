import { Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../theme/theme'

const LearnWordsCard = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                    background: colors.primary[400],
                    maxWidth: '400px',
                    margin: '0 auto '
                }}
            >
                <Box sx={{ padding: '20px' }}>LearnWordsCard</Box>
            </Paper>
        </Box>
    )
}

export default LearnWordsCard
