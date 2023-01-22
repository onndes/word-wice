import { Box } from '@mui/material'
import React from 'react'
import AddWord from '../components/AddWord/AddWord'
import TableWords from '../components/TableWords/TableWords'

const Vocabulary = () => {
    return (
        <Box
            sx={(theme) => ({
                maxWidth: '1400px',
                margin: 'auto',
                [theme.breakpoints.up('lg')]: {
                    maxWidth: '1000px',
                },
            })}
        >
            <AddWord />
            <TableWords />
        </Box>
    )
}

export default Vocabulary
