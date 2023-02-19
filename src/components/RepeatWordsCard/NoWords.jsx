import { Box, Typography } from '@mui/material'
import React from 'react'
import MoodIcon from '@mui/icons-material/Mood'
import { PaperLearn } from '../PaperLearn'
import useMyTheme from '../../hooks/useMyTheme'

const NoWords = () => {
    const { t } = useMyTheme()

    return (
        <PaperLearn>
            <Box textAlign="center">
                <Box>
                    <Typography variant="h4" color="" mb={2}>
                        {t('There are no words for repeating so far')}
                    </Typography>
                    <Typography variant="h4" color="" mb={2}>
                        {t(`Time hasn't come yet`)}
                    </Typography>
                    <MoodIcon />
                </Box>
            </Box>
        </PaperLearn>
    )
}

export default NoWords
