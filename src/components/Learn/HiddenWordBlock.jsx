import React from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WordSpeaker from '../WordSpeaker'

const HiddenWordBlock = ({
    isWords,
    word,
    visibility,
    onVisible,
    title,
    show,
}) => {
    return (
        <Box mt={2} mb={2} ml={1}>
            <Typography mb={1} variant="h6" color="text.secondary">
                {title}
            </Typography>
            {visibility ? (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography ml={1} variant="h3" color="text.primary">
                        {isWords ? word[show] : 'Loading...'}{' '}
                    </Typography>
                    <WordSpeaker word={word[show]} />
                </Box>
            ) : (
                <Tooltip title="Add to study">
                    <IconButton aria-label="Show translate" onClick={onVisible}>
                        <VisibilityIcon fontSize="medium" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    )
}

export default HiddenWordBlock
