import { Box, Button } from '@mui/material'
import React from 'react'
import { PaperLearn } from './PaperLearn'

const Started = ({ handle }) => {
    return (
        <Box sx={{ maxWidth: '400px', margin: '0 auto ' }}>
            <PaperLearn>
                <Box sx={{ padding: '20px' }} textAlign="center">
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
                        Start!
                    </Button>
                </Box>
            </PaperLearn>
        </Box>
    )
}

export default Started
