import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useMyTheme from '../../hooks/useMyTheme'
import { WORDS_ROUTE } from '../../utils/consts'

const NoWords = ({ setCheckWords, countWords, recommendForLearn }) => {
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
                    <Box mb={9}>
                        <Typography variant="h4" color="" mb={1}>
                            Not enough words to study
                        </Typography>
                        <Typography variant="h4" color="" mb={1}>
                            It takes at least - {recommendForLearn}
                        </Typography>
                        <Typography variant="h4" color="">
                            Now - {countWords}
                        </Typography>
                    </Box>
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
                            to={WORDS_ROUTE}
                        >
                            Added words
                        </Link>
                    </Button>
                    <Button
                        onClick={setCheckWords}
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
