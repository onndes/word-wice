import { Box, Typography } from '@mui/material'
import React from 'react'
import MoodIcon from '@mui/icons-material/Mood'
import { PaperLearn } from '../PaperLearn'

const NoWords = () => {
    return (
        <PaperLearn>
            <Box textAlign="center">
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
        </PaperLearn>
    )
}

export default NoWords
