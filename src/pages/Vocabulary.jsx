import { Box, Container } from '@mui/material'
import React from 'react'
import AddWord from '../components/AddWord/AddWord'
import TableWords from '../components/TableWords/TableWords'

const Vocabulary = () => {
    return (
        <>
            <AddWord />
            <TableWords />
        </>
    )
}

export default Vocabulary
