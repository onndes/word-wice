import { Box, Typography } from '@mui/material'
import React from 'react'
import WordRank from './WordRank'

const VisibleWordBlock = ({ word, isWords, title, show }) => {
    return (
        <Box mb={2} ml={1}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '20px',
                    justifyContent: 'space-between',
                }}
            >
                <Typography mb={1} variant="h6" color="text.secondary">
                    {title}
                </Typography>
                {isWords && <WordRank word={word} />}
            </Box>
            <Typography ml={1} variant="h3" color="text.primary">
                {word[show]}
            </Typography>
        </Box>
    )
}

export default VisibleWordBlock
