import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Slide } from '@mui/material'

export default function TransitionAlerts({
    text,
    checkedAlert,
    setCheckedAlert,
    severity = 'success',
}) {
    return (
        <Box
            sx={{
                maxWidth: '300px',
                position: 'fixed',
                bottom: '10px',
                right: '10px',
            }}
        >
            <Slide
                direction="left"
                in={checkedAlert}
                mountOnEnter
                unmountOnExit
            >
                <Alert
                    severity={severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setCheckedAlert(false)
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {text}
                </Alert>
            </Slide>
        </Box>
    )
}
