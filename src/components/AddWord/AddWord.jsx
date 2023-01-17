import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import { nanoid } from 'nanoid'
import { Timestamp } from 'firebase/firestore'

import {
    addWords,
    translateWord,
} from '../../redux/slices/wordsSlice/wordsAsync'
import { schemaFormAddWord } from '../../utils/schemaFormAddWord'
import MyInput from './MyInput'
import MyAlertDialogSlide from '../MyAlertDialogSlide'
import {
    collectionNameWords,
    formAddWordProps,
    knowWord,
} from '../../utils/consts'

const AddWord = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(null)

    const { handleSubmit, control, reset, getValues, setValue, watch } =
        useForm({
            resolver: yupResolver(schemaFormAddWord),
        })

    const [activeButtonTranslate, setActiveButtonTranslate] =
        React.useState(false)
    const [openModalTranslate, setOpenModalTranslate] = React.useState(false)
    const [confirmTranslate, setConfirmTranslate] = React.useState(false)
    const [hideConfirmTranslate, setHideConfirmTranslate] =
        React.useState(false)

    const watchFields = watch(['word', 'translation'])

    const { word, translation, transcription } = formAddWordProps

    const onSubmit = (data) => {
        setFormData(data)
        reset()
    }

    useEffect(() => {
        if (formData) {
            dispatch(
                addWords({
                    collectionName: collectionNameWords.NEW,
                    word: {
                        ...formData,
                        id: nanoid(),
                        dateCreated: Timestamp.fromDate(new Date()),
                        knowledge: knowWord.A0.code,
                        dateLearned: null,
                        countRepeat: 0,
                        imgUrl: null,
                    },
                })
            )
        }
    }, [formData])

    const handleClickButtonTranslate = () => {
        const check = window.localStorage.getItem('confirmTranslate')

        if (check) {
            handleTranslate()
        } else if (getValues().word || getValues().translation)
            setOpenModalTranslate(true)
    }

    useEffect(() => {
        if (confirmTranslate && hideConfirmTranslate) {
            window.localStorage.setItem('confirmTranslate', 'true')
            setHideConfirmTranslate(false)
        }
        if (confirmTranslate) handleTranslate()
    }, [confirmTranslate])

    const handleTranslate = () => {
        const wordEng = getValues().word
        const wordRu = getValues().translation
        if (!wordRu && wordEng) {
            setValue(translation.name, '')
            translateWord(wordEng, 'en', 'ru').then((e) =>
                setValue(translation.name, e)
            )
        } else if (!wordEng && wordRu) {
            setValue(word.name, '')
            translateWord(wordRu, 'ru', 'en').then((e) => {
                setValue(word.name, e)
            })
        }
        setConfirmTranslate(false)
    }

    useEffect(() => {
        const wordEng = getValues().word
        const wordRu = getValues().translation
        if (wordEng && wordRu) {
            setActiveButtonTranslate(true)
        } else {
            setActiveButtonTranslate(false)
        }
    }, [watchFields])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    m: 1,
                    width: '25ch',
                },
                display: 'flex',
                alignItems: 'top',
            }}
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
            <MyInput control={control} label={word.label} name={word.name} />
            <Box m={2} alignItems="center">
                <IconButton
                    disabled={activeButtonTranslate}
                    aria-label="translate"
                    color="secondary"
                    onClick={handleClickButtonTranslate}
                >
                    <GTranslateIcon />
                </IconButton>
            </Box>
            <MyInput
                control={control}
                label={translation.label}
                name={translation.name}
            />
            <MyInput
                control={control}
                label={transcription.label}
                name={transcription.name}
            />

            <Button
                color="secondary"
                variant="contained"
                type="submit"
                sx={{
                    height: '50px',
                    width: '100px',
                    fontSize: '18px',
                    mt: '10px',
                }}
            >
                ADD
            </Button>
            <MyAlertDialogSlide
                open={openModalTranslate}
                setOpen={setOpenModalTranslate}
                setConfirm={setConfirmTranslate}
                hideConfirm={hideConfirmTranslate}
                setHideConfirm={setHideConfirmTranslate}
            />
        </Box>
    )
}

export default AddWord
