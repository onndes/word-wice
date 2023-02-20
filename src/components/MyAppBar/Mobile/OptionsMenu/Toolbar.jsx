import React from 'react'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import useMyTheme from '../../../../hooks/useMyTheme'

const Toolbar = ({ title, handle }) => {
    const { t } = useMyTheme()
    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mr={1}
                ml={1}
                gap={1}
            >
                <Typography variant="h4" color="text.secondary">
                    {t(title)}
                </Typography>
                <IconButton aria-label="" onClick={() => handle(null)}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Divider sx={{ my: 0.5 }} />
        </Box>
    )
}

export default Toolbar
