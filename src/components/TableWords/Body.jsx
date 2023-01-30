import React from 'react'
import { format } from 'date-fns'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableBody from '@mui/material/TableBody'

import { getComparator, stableSort } from '../../utils/utilsTable'
import LinearIndeterminate from '../LinearIndeterminate'
import { knowWord } from '../../utils/consts'
import WordRank from '../WordRank'

const Body = ({
    order,
    orderBy,
    page,
    rowsPerPage,
    isSelected,
    handleClick,
    emptyRows,
    dense,
    words,
    isLoading,
}) => {
    return (
        <TableBody>
            {/* if you don't need to support IE11, 
            you can replace the `stableSort` call with:
            rows.sort(getComparator(order, orderBy)).slice() */}
            {stableSort(words, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = row.id

                    const date = row.dateCreated
                        ? format(row.dateCreated.toDate(), 'dd-MM-yyyy hh:mm a')
                        : 'not data'

                    return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="secondary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </TableCell>
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                sx={{ minWidth: '180px' }}
                            >
                                {row.word}
                            </TableCell>
                            <TableCell sx={{ minWidth: '180px' }} align="left">
                                {row.translation}
                            </TableCell>
                            <TableCell align="left">
                                <WordRank word={knowWord[row.knowledge]} />
                            </TableCell>
                            <TableCell align="left">
                                {row.transcription}
                            </TableCell>
                            <TableCell sx={{ width: '50px' }} align="center">
                                {date}
                            </TableCell>
                        </TableRow>
                    )
                })}
            {isLoading && !words.length && (
                <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                >
                    <TableCell colSpan={6}>
                        <LinearIndeterminate />
                    </TableCell>
                </TableRow>
            )}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    )
}

export default Body
