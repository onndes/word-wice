import React, { useCallback, useMemo, useState } from 'react'
import {
    Paper,
    Typography,
    Container,
    Box,
    IconButton,
    Divider,
} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Timestamp } from 'firebase/firestore'
import ConfirmDialog from '../ConfirmDialog'
import { collectionNameWords, knowWord } from '../../utils/consts'
import { addWords } from '../../redux/slices/wordsSlice/wordsAsync'

const CardsWordsBase = ({ words }) => {
    const dispatch = useDispatch()
    const { i18n } = useTranslation()

    const { newWords, inProcessWords, learnedWords } = useSelector(
        ({ words }) => words
    )
    const [openConfirmAdd, setOpenConfirmAdd] = useState(false)
    const [selected, setSelected] = useState([])
    const [currentAddWords, setCurrentAddWords] = useState(null)

    const vocEnWords = useMemo(() => {
        const wordsVoc = [...newWords, ...inProcessWords, ...learnedWords]
        return wordsVoc.map((el) => {
            return el.word.toLowerCase()
        })
    }, [newWords, inProcessWords, learnedWords])
    const lang = i18n.language === 'en' ? 'ru' : i18n.language

    // const handleClick = (word) => {
    //     const selectedIndex = selected.indexOf(word)
    //     let newSelected = []

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, word)
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1))
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1))
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1)
    //         )
    //     }

    //     setSelected(newSelected)
    // }

    const isSelected = useCallback(
        (wordId) => selected.some((el) => el.en === wordId),
        [selected]
    )

    const handleClickAdd = () => {
        const collectionName = collectionNameWords.NEW

        const word = {
            word: currentAddWords.en,
            transcription: currentAddWords.t,
            translation: currentAddWords?.[lang] || currentAddWords.ru,
            id: nanoid(),
            dateCreated: Timestamp.fromDate(new Date()),
            dateChange: Timestamp.fromDate(new Date()),
            knowledge: knowWord.A0.code,
            dateLearned: null,
            countRepeat: 0,
            imgUrl: null,
        }

        dispatch(addWords({ collectionName, word }))
        setCurrentAddWords()
    }

    return (
        <Container maxWidth="sm" disableGutters sx={{ pb: 10 }}>
            {words.map((row) => {
                const isItemSelected = isSelected(row.en)
                const isInStock =
                    vocEnWords?.indexOf(row.en.toLowerCase().trim()) !== -1

                return (
                    <Paper
                        key={row.en}
                        elevation={1}
                        sx={(theme) => ({
                            padding: 0,
                            width: '100%',
                            mb: 0.5,
                            opacity: isInStock ? 0.3 : 1,
                            backgroundColor: isItemSelected
                                ? theme.palette.background.default
                                : theme.palette.background.main,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        })}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            p={1}
                            width="100%"
                            // onClick={() => !isInStock && handleClick(row)}
                        >
                            <Typography
                                variant="p"
                                fontSize="16px"
                                color="text.primary"
                            >
                                {row.en}
                            </Typography>
                            <Typography
                                variant="p"
                                fontSize="13px"
                                color="text.secondary"
                            >
                                {row?.[lang] || row.ru}
                            </Typography>
                            <Typography>{row.transcription}</Typography>
                        </Box>
                        <Divider orientation="vertical" light flexItem />

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <IconButton
                                disabled={isInStock}
                                size="large"
                                aria-label={`add word ${row.en}`}
                                sx={{
                                    margin: 0.5,
                                }}
                                onClick={() => {
                                    setOpenConfirmAdd(true)
                                    setCurrentAddWords(row)
                                }}
                            >
                                <AddBoxIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Paper>
                )
            })}
            <ConfirmDialog
                text="Вы уверены что хотите добавить это слово?"
                open={openConfirmAdd}
                setOpen={setOpenConfirmAdd}
                onConfirm={handleClickAdd}
                onRefute={() => {
                    setSelected([])
                    setCurrentAddWords(null)
                }}
            />
        </Container>
    )
}

export default CardsWordsBase
