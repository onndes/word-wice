import { Box } from '@mui/material'
import React from 'react'
import AddWord from '../components/AddWord/AddWord'

const AddWordPage = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <AddWord mobile />
        </Box>
    )
}

export default AddWordPage
