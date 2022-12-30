import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useTheme } from '@mui/material'

import TableBodyWords from './Body'
import TableToolbar from './MyToolbar'
import TableHeadWords from './Head'
import { tokens } from '../../theme/theme'
import { fetchWords } from '../../redux/slices/wordsSlice/wordsSlice'

export default function TableWords() {
    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const words = useSelector(({ words }) => words.words)

    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('word')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleRequestSort = (_, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = words.map((n) => n.name)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    React.useEffect(() => {
        dispatch(fetchWords())
    }, [])

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (_, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    // Avoid a layout jump when reaching the last page with empty words.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - words.length) : 0

    return (
        <Box sx={{ width: '100%', maxWidth: 800 }}>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                    background: colors.primary[400],
                }}
            >
                <TableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <TableHeadWords
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={words.length}
                        />
                        <TableBodyWords
                            words={words}
                            order={order}
                            orderBy={orderBy}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            isSelected={isSelected}
                            handleClick={handleClick}
                            emptyRows={emptyRows}
                            dense={dense}
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={words.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch
                        color="secondary"
                        checked={dense}
                        onChange={handleChangeDense}
                    />
                }
                label="Dense padding"
            />
        </Box>
    )
}
