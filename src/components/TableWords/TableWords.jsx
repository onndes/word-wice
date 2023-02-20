import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Body from './Body'
import MyToolbar from './MyToolbar'
import Head from './Head'
import {
    setOrder,
    setOrderBy,
    setSelected,
} from '../../redux/slices/settingsAppSlice/settingsAppSlice'
import {
    deleteWords,
    submitWordsForStudy,
} from '../../redux/slices/wordsSlice/wordsAsync'
import { selectStatusWords } from '../../redux/slices/wordsSlice/wordsSlice'
import { collectionNameWords, knowWord } from '../../utils/consts'
import BasicAlerts from '../BasicAlerts'
import useMyTheme from '../../hooks/useMyTheme'
import ConfirmDialog from '../ConfirmDialog'

export default function TableWords() {
    const dispatch = useDispatch()
    const { mq } = useMyTheme()
    const { newWords, inProcessWords, learnedWords, filter } = useSelector(
        ({ words }) => words
    )

    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [openConfirmWordsForStudy, setOpenConfirmWordsForStudy] =
        useState(false)

    let words = []

    if (filter.newWords) words = [...words, ...newWords]
    if (filter.inProcessWords) words = [...words, ...inProcessWords]
    if (filter.learnedWords) words = [...words, ...learnedWords]

    const { rowsPerPage, order, orderBy, selected, page } = useSelector(
        ({ settingsApp }) => settingsApp.wordsList
    )
    const FetchWords = useSelector(
        selectStatusWords(['newWords', 'inProcessWords', 'learnedWords'])
    )

    const [dense, setDense] = React.useState(true)

    const [checkedAlert, setCheckedAlert] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState(0)

    const handleRequestSort = (_, property) => {
        const isAsc = orderBy === property && order === 'asc'
        dispatch(setOrder(isAsc ? 'desc' : 'asc'))
        dispatch(setOrderBy(property))
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            dispatch(setSelected(words))
            return
        }
        dispatch(setSelected([]))
    }

    const handleClick = (_, word) => {
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

        dispatch(setSelected(newSelected))
    }

    const handleClearSelected = () => dispatch(setSelected([]))

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }

    const handleClickDeleteWords = () => {
        const delWords = {
            [collectionNameWords.NEW]: [],
            [collectionNameWords.LEARNED]: [],
            [collectionNameWords.IN_PROCESS]: [],
        }
        selected.forEach((el) => {
            if (el.knowledge === knowWord.A0.code) {
                delWords[collectionNameWords.NEW].push(el)
            } else if (el.knowledge === knowWord.C2.code) {
                delWords[collectionNameWords.LEARNED].push(el)
            } else {
                delWords[collectionNameWords.IN_PROCESS].push(el)
            }
        })
        Object.keys(delWords).forEach((collection) => {
            if (delWords[collection].length)
                dispatch(
                    deleteWords({
                        collectionName: collection,
                        words: delWords[collection],
                    })
                )
        })

        handleClearSelected()
    }

    const handleSubmitWordsForStudy = () => {
        let displayAlert = 0
        selected.forEach((el) => {
            if (el.knowledge === knowWord.A0.code) {
                dispatch(submitWordsForStudy(el))
                displayAlert++
            }
        })
        setAlertMessage(displayAlert)
        setCheckedAlert(true)
        setTimeout(() => setCheckedAlert(false), 2000)
        handleClearSelected()
    }

    const isSelected = (wordId) => selected.some((el) => el.id === wordId)

    // Avoid a layout jump when reaching the last page with empty words.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - words.length) : 0

    const messageConfirmForStudy = `Are you certain that you wish to add these 
        ${selected.filter((el) => el.knowledge === knowWord.A0.code).length}
        word(s) to your study list?`
    const messageConfirmDelete = `Are you certain that you wish to 
        remove these ${selected.length} word(s) from your dictionary?`

    return (
        <Box sx={{ width: '100%', height: '50%' }}>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                    mr: 2,
                }}
            >
                <MyToolbar
                    numSelected={selected.length}
                    handleDelete={() => setOpenConfirmDelete(true)}
                    handleSubmitForStudy={() =>
                        setOpenConfirmWordsForStudy(true)
                    }
                />
                <TableContainer sx={{ maxHeight: '550px' }}>
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
                            statusData={FetchWords}
                        />
                    </Table>
                </TableContainer>
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
            {!mq ? (
                <BasicAlerts
                    text={`Added words to study: ${alertMessage}`}
                    checkedAlert={checkedAlert}
                    setCheckedAlert={setCheckedAlert}
                    severity={alertMessage ? 'success' : 'error'}
                />
            ) : null}
            <ConfirmDialog
                title="Confirm"
                text={messageConfirmDelete}
                open={openConfirmDelete}
                setOpen={setOpenConfirmDelete}
                onConfirm={handleClickDeleteWords}
                onRefute={handleClearSelected}
            />
            <ConfirmDialog
                title="Confirm"
                text={messageConfirmForStudy}
                open={openConfirmWordsForStudy}
                setOpen={setOpenConfirmWordsForStudy}
                onConfirm={handleSubmitWordsForStudy}
                onRefute={handleClearSelected}
            />
        </Box>
    )
}
