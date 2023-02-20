import React, { useEffect } from 'react'
import { Paper, Typography, Container, Box } from '@mui/material'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import { getComparator, stableSort } from '../../utils/utilsTable'
import WordRank from '../WordRank'
import { setSelected } from '../../redux/slices/settingsAppSlice/settingsAppSlice'
import { selectStatusWords } from '../../redux/slices/wordsSlice/wordsSlice'
import { STATUS } from '../../utils/handleStatus'
import LinearIndeterminate from '../LinearIndeterminate'

const CardsWords = () => {
    const dispatch = useDispatch()
    const { newWords, inProcessWords, learnedWords, filter } = useSelector(
        ({ words }) => words
    )

    let words = []

    if (filter.newWords) words = [...words, ...newWords]
    if (filter.inProcessWords) words = [...words, ...inProcessWords]
    if (filter.learnedWords) words = [...words, ...learnedWords]

    const statusData = useSelector(
        selectStatusWords(['newWords', 'inProcessWords', 'learnedWords'])
    )

    const { order, orderBy, selected } = useSelector(
        ({ settingsApp }) => settingsApp.wordsList
    )

    useEffect(() => {
        return () => dispatch(setSelected([]))
    }, [])

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

    const isSelected = (wordId) => selected.some((el) => el.id === wordId)

    if (statusData.status === STATUS.loading)
        return (
            <Container maxWidth="sm" disableGutters sx={{ mb: 10 }}>
                <LinearIndeterminate />
            </Container>
        )

    if (statusData.status === STATUS.success && words.length === 0)
        return (
            <Container
                maxWidth="sm"
                disableGutters
                sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}
            >
                <Typography variant="h4" color="GrayText">
                    The list of words is empty
                </Typography>
            </Container>
        )

    return (
        <Container maxWidth="sm" disableGutters sx={{ mb: 10 }}>
            {stableSort(words, getComparator(order, orderBy)).map((row) => {
                const isItemSelected = isSelected(row.id)

                const date = row.dateCreated
                    ? format(row.dateCreated.toDate(), 'dd-MM-yyyy hh:mm a')
                    : 'not data'

                return (
                    <Paper
                        onClick={(event) => handleClick(event, row)}
                        key={row.id}
                        elevation={1}
                        sx={(theme) => ({
                            padding: 1,
                            width: '100%',
                            mb: 0.5,
                            backgroundColor: isItemSelected
                                ? theme.palette.background.default
                                : theme.palette.background.main,
                            display: 'flex',
                            gap: 3,
                            justifyContent: 'space-between',
                        })}
                    >
                        <Box display="flex" flexDirection="column">
                            <Typography
                                variant="p"
                                fontSize="16px"
                                color="text.primary"
                            >
                                {row.word}
                            </Typography>
                            <Typography
                                variant="p"
                                fontSize="13px"
                                color="text.secondary"
                            >
                                {row.translation}
                            </Typography>
                            <Typography>{row.transcription}</Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="end"
                            gap={0.4}
                            minWidth="118px"
                        >
                            <WordRank word={row} />
                            <Typography fontSize="12px" color="text.secondary">
                                {date}
                            </Typography>
                        </Box>
                    </Paper>
                )
            })}
        </Container>
    )
}

export default CardsWords
