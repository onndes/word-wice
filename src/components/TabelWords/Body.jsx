import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableBody from '@mui/material/TableBody'

import { getComparator, stableSort } from '../../utils/utilsTable'

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
                            >
                                {row.word}
                            </TableCell>
                            <TableCell align="left">
                                {row.translation}
                            </TableCell>
                            <TableCell align="left">
                                {row.transcription}
                            </TableCell>
                        </TableRow>
                    )
                })}
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
