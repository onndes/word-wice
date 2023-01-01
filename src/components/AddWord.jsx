import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import GTranslateIcon from '@mui/icons-material/GTranslate'

import { addWords, translateWord } from '../redux/slices/wordsSlice/wordsAsync'
import { schemaFormAddWord } from '../utils/schemaFormAddWord'
import MyInput from './MyInput'
import MyAlertDialogSlide from './MyAlertDialogSlide'

const AddWord = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(null)
    const { handleSubmit, control, reset, getValues, setValue } = useForm({
        resolver: yupResolver(schemaFormAddWord),
    })
    const [openModalTranslate, setOpenModalTranslate] = React.useState(false)
    const [confirmTranslate, setConfirmTranslate] = React.useState(false)
    const [hideConfirmTranslate, setHideConfirmTranslate] =
        React.useState(false)

    const onSubmit = (data) => {
        setFormData(data)
        reset()
    }

    useEffect(() => {
        if (formData) {
            dispatch(addWords(formData))
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
            setValue('translation', '')
            translateWord(wordEng, 'en', 'ru').then((e) =>
                setValue('translation', e)
            )
        } else if (!wordEng && wordRu) {
            setValue('word', '')
            translateWord(wordRu, 'ru', 'en').then((e) => {
                setValue('word', e)
            })
        }
        setConfirmTranslate(false)
    }

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
            <MyInput control={control} label="Word" name="word" />
            <Box m={2} alignItems="center">
                <IconButton
                    aria-label="translate"
                    color="secondary"
                    onClick={handleClickButtonTranslate}
                >
                    <GTranslateIcon />
                </IconButton>
            </Box>
            <MyInput control={control} label="Translation" name="translation" />
            <MyInput control={control} label="Transcript" name="transcript" />

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
