import React from 'react'
import { Box, colors, IconButton, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'

const WordBlock = ({ isWords, word, visibility, show }) => {
    return (
        <Box mt={2} mb={2} ml={1}>
            <Typography mb={1} variant="h6" color={colors.grey[400]}>
                Word:
            </Typography>
            {visibility ? (
                <Typography ml={1} variant="h3" color="initial">
                    {isWords ? word.word : 'Loading...'}
                </Typography>
            ) : (
                <Tooltip title="Add to study">
                    <IconButton aria-label="Show translate" onClick={show}>
                        <VisibilityIcon fontSize="medium" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    )
}

export default WordBlock
