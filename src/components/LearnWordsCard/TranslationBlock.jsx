import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme/theme'
import { knowWord } from '../../utils/consts'
import WordRank from '../WordRank'

const TranslationBlock = ({ word, isWords }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
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
                <Typography mb={1} variant="h6" color={colors.grey[400]}>
                    Translation:
                </Typography>
                {isWords && <WordRank word={knowWord[word.knowledge]} />}
            </Box>
            <Typography ml={1} variant="h3" color="initial">
                {isWords ? word.translation : 'Loading...'}
            </Typography>
        </Box>
    )
}

export default TranslationBlock
