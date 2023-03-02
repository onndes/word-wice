import { Box } from '@mui/material'
import React, { lazy } from 'react'

const DynamicAddWord = lazy(() => import('../components/AddWord/AddWord'))

const AddWordPage = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <DynamicAddWord />
        </Box>
    )
}

export default AddWordPage
