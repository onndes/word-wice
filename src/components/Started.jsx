import { Box, Button } from '@mui/material'
import React from 'react'
import useMyTheme from '../hooks/useMyTheme'
import { PaperLearn } from './PaperLearn'

const Started = ({ handle }) => {
    const { t } = useMyTheme()

    return (
        <PaperLearn>
            <Box
                textAlign="center"
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    onClick={handle}
                    variant="contained"
                    color="success"
                    display="flex"
                    size="large"
                    sx={{
                        fontWeight: 600,
                        letterSpacing: 1,
                        color: 'white',
                    }}
                >
                    {t('Start')}
                </Button>
            </Box>
        </PaperLearn>
    )
}

export default Started
