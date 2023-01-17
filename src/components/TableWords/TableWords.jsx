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

import Body from './Body'
import MyToolbar from './MyToolbar'
import Head from './Head'
import { tokens } from '../../theme/theme'
// eslint-disable-next-line max-len
import { setRowsPerPage } from '../../redux/slices/settingsAppSlice/settingsAppSlice'
import {
    deleteWords,
    fetchWords,
    submitWordsForStudy,
} from '../../redux/slices/wordsSlice/wordsAsync'
import { selectLoading } from '../../redux/slices/wordsSlice/wordsSlice'
import { collectionNameWords, isLoading, knowWord } from '../../utils/consts'

export default function TableWords() {
    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const { newWords, inProcessWords, learnedWords } = useSelector(
        ({ words }) => words
    )
    const words = [...newWords, ...inProcessWords, ...learnedWords]
    const isLoadingFetchWords = useSelector(
        selectLoading(isLoading.FETCH_WORDS)
    )
    const { rowsPerPage } = useSelector(
        ({ settingsApp }) => settingsApp.tableVocabulary
    )

    const [order, setOrder] = React.useState('desc')
    const [orderBy, setOrderBy] = React.useState('dateCreated')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)

    const handleRequestSort = (_, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(words)
            return
        }
        setSelected([])
    }

    React.useEffect(() => {
        dispatch(fetchWords())
    }, [])

    const handleClick = (event, word) => {
        const selectedIndex = selected.indexOf(word)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, word)
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
        // dispatch()
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)))
        setPage(0)
    }

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }

    const handleClickDeleteWords = () => {
        selected.forEach((el) => {
            let name = ''
            if (el.knowledge === knowWord.A0.code) {
                name = collectionNameWords.NEW
            } else if (el.knowledge === knowWord.C2.code) {
                name = collectionNameWords.LEARNED
            } else {
                name = collectionNameWords.IN_PROCESS
            }

            dispatch(
                deleteWords({
                    collectionName: name,
                    word: el,
                })
            )
        })
        setSelected([])
    }

    const handleSubmitWordsForStudy = () => {
        selected.forEach((el) => {
            if (el.knowledge === knowWord.A0.code) {
                dispatch(submitWordsForStudy(el))
            }
        })
        setSelected([])
    }

    const isSelected = (wordId) => selected.some((el) => el.id === wordId)

    // Avoid a layout jump when reaching the last page with empty words.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - words.length) : 0

    return (
        <Box sx={{ width: '100%', maxWidth: 1200 }}>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                    background: colors.primary[400],
                }}
            >
                <MyToolbar
                    numSelected={selected.length}
                    handleDelete={handleClickDeleteWords}
                    handleSubmitForStudy={handleSubmitWordsForStudy}
                />
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <Head
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={words.length}
                        />
                        <Body
                            words={words}
                            order={order}
                            orderBy={orderBy}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            isSelected={isSelected}
                            handleClick={handleClick}
                            emptyRows={emptyRows}
                            dense={dense}
                            isLoading={isLoadingFetchWords}
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
