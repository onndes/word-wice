import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ADD_WORD_ROUTE } from '../../utils/consts'

const AddWordMobile = () => {
    return (
        <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
                component={Link}
                to={ADD_WORD_ROUTE}
                variant="contained"
                color="secondary"
            >
                Add Word
            </Button>
        </Box>
    )
}

export default AddWordMobile
