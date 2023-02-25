import React, { useCallback, useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { Timestamp } from 'firebase/firestore'
import ConfirmDialog from '../ConfirmDialog'
import { collectionNameWords, knowWord } from '../../utils/consts'
import { addWords } from '../../redux/slices/wordsSlice/wordsAsync'

const CardsWordsBase = ({ words }) => {
    const dispatch = useDispatch()
    const [openConfirmAdd, setOpenConfirmAdd] = useState(false)
    const [selected, setSelected] = useState([])
    const [currentAddWords, setCurrentAddWords] = useState(null)

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

        setSelected(newSelected)
    }

    const isSelected = useCallback(
        (wordId) => selected.some((el) => el.en === wordId),
        [selected]
    )

    const handleClickAdd = () => {
        const collectionName = collectionNameWords.NEW
        const word = {
            word: currentAddWords.en,
            transcription: currentAddWords.t,
            translation: currentAddWords.ru,
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

                return (
                    <Paper
                        key={row.en}
                        elevation={1}
                        sx={(theme) => ({
                            padding: 0,
                            width: '100%',
                            mb: 0.5,
                            backgroundColor: isItemSelected
                                ? theme.palette.background.default
                                : theme.palette.background.main,
                            gap: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alightItems: 'center',
                        })}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            p={1}
                            width="100%"
                            onClick={(event) => handleClick(event, row)}
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
                                {row.ru}
                            </Typography>
                            <Typography>{row.transcription}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alightItems: 'center',
                            }}
                        >
                            <Divider orientation="vertical" light flexItem />
                            <IconButton
                            disabled
                                size="large"
                                aria-label=""
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
