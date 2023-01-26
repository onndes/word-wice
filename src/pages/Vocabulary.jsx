import React from 'react'
import { useMediaQuery } from '@mui/material'
import AddWord from '../components/AddWord/AddWord'
import AddWordMobile from '../components/AddWord/Mobile/AddWordMobile'
import TableWords from '../components/TableWords/TableWords'
import usePosition from '../hooks/usePosition'

const Vocabulary = () => {
    const matches = useMediaQuery('(max-width:600px)')
    const currentPosition = usePosition()

    return (
        <>
            {matches && currentPosition < 20 && <AddWordMobile />}
            {!matches && <AddWord />}
            <TableWords />
        </>
    )
}

export default Vocabulary
