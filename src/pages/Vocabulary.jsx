import { Box, Button, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddWord from '../components/AddWord/AddWord'
import AddWordMobile from '../components/AddWordMobile/AddWordMobile'
import TableWords from '../components/TableWords/TableWords'

// eslint-disable-next-line react-hooks/rules-of-hooks

const Vocabulary = () => {
    const matches = useMediaQuery('(max-width:600px)')

    return (
        <>
            {matches ? <AddWordMobile /> : <AddWord />}
            <TableWords />
        </>
    )
}

export default Vocabulary
