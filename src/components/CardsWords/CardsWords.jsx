import React from 'react'
import { Paper, Typography, Container, Box } from '@mui/material'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { getComparator, stableSort } from '../../utils/utilsTable'
import useMyTheme from '../../hooks/useMyTheme'
import WordRank from '../WordRank'
import { knowWord } from '../../utils/consts'
import { fetchWords } from '../../redux/slices/wordsSlice/wordsAsync'
// eslint-disable-next-line max-len
import { setSelected } from '../../redux/slices/settingsAppSlice/settingsAppSlice'

const CardsWords = () => {
    const dispatch = useDispatch()
    const { colors } = useMyTheme()
    const { newWords, inProcessWords, learnedWords } = useSelector(
        ({ words }) => words
    )
    const words = [...newWords, ...inProcessWords, ...learnedWords]

    const { rowsPerPage, order, orderBy, selected, page } = useSelector(
        ({ settingsApp }) => settingsApp.wordsList
    )

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

        dispatch(setSelected(newSelected))
    }

    const isSelected = (wordId) => selected.some((el) => el.id === wordId)

    return (
        <Container maxWidth="sm" disableGutters sx={{ mb: 10 }}>
            {stableSort(words, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    const isItemSelected = isSelected(row.id)

                    const date = row.dateCreated
                        ? format(row.dateCreated.toDate(), 'dd-MM-yyyy hh:mm a')
                        : 'not data'

                    return (
                        <Paper
                            onClick={(event) => handleClick(event, row)}
                            key={row.id}
                            elevation={1}
                            sx={{
                                padding: 1,
                                width: '100%',
                                mb: 0.3,
                                background: isItemSelected
                                    ? colors.primary[600]
                                    : colors.primary[400],
                                display: 'flex',
                                gap: 3,
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box display="flex" flexDirection="column">
                                <Typography variant="p" fontSize="16px">
                                    {row.word}
                                </Typography>
                                <Typography
                                    variant="p"
                                    fontSize="13px"
                                    color="Highlight"
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
                                <WordRank word={knowWord[row.knowledge]} />
                                <Typography fontSize="12px" color="lightGrey">
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
