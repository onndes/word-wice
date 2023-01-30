import { Box, Typography } from '@mui/material'
import React from 'react'
import useMyTheme from '../../hooks/useMyTheme'
import { knowWord } from '../../utils/consts'
import WordRank from '../WordRank'

const TranslationBlock = ({ word, isWords }) => {
    const { colors } = useMyTheme()

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
