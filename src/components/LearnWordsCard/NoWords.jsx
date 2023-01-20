import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { tokens } from '../../theme/theme'
import { VOCABULARY_ROUTE } from '../../utils/consts'

const NoWords = ({ setCheckWords, countWords }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
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
                }}
            >
                <Box sx={{ padding: '20px' }} textAlign="center">
                    <Typography variant="h3" color="" mb={9}>
                        Not enough words to study, <br /> it takes at least 5
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: colors.greenAccent[600],

                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: colors.greenAccent[700],
                            },
                            margin: '0 10px 0 0',
                        }}
                        display="flex"
                    >
                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={VOCABULARY_ROUTE}
                        >
                            Added words
                        </Link>
                    </Button>
                    <Button
                        onClick={() => setCheckWords(false)}
                        variant="contained"
                        disabled={countWords === 0}
                        sx={{
                            backgroundColor: colors.redAccent[500],

                            color: 'black',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: colors.redAccent[600],
                            },
                            margin: '0 10px 0 0',
                        }}
                    >
                        Still continue
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default NoWords
