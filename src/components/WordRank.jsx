import { Box } from '@mui/material'
import React from 'react'

const WordRank = ({ word, countRepeat = 0 }) => {
    return (
        <Box
            sx={{
                background: word.color,
                padding: '3px 10px',
                fontWeight: 500,
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'center',
                width: '110px',
                letterSpacing: '1px',
                borderRadius: '10px',
            }}
        >
            {word.tittle} {countRepeat ? `(${countRepeat})` : null}
        </Box>
    )
}

export default WordRank
