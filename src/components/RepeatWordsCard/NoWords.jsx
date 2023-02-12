import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import MoodIcon from '@mui/icons-material/Mood'
import useMyTheme from '../../hooks/useMyTheme'

const NoWords = () => {
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
                    <Box mb={9}>
                        <Typography variant="h4" color="" mb={1}>
                            There are no words for repeating so far
                        </Typography>
                        <Typography variant="h4" color="" mb={1}>
                            {`Time hasn't come yet`}
                        </Typography>
                        <MoodIcon />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default NoWords
