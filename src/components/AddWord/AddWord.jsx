import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import { nanoid } from 'nanoid'
import { Timestamp } from 'firebase/firestore'
import { Link, redirect } from 'react-router-dom'
import {
    addWords,
    translateWord,
} from '../../redux/slices/wordsSlice/wordsAsync'
import { schemaFormAddWord } from '../../utils/schemaFormAddWord'
import MyInput from './MyInput'
import MyAlertDialogSlide from '../MyAlertDialogSlide'
import {
    collectionNameWords,
    fieldsData,
    knowWord,
    WORDS_ROUTE,
} from '../../utils/consts'

const AddWord = ({ mobile }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(null)

    const { handleSubmit, control, reset, getValues, setValue, watch } =
        useForm({
            resolver: yupResolver(schemaFormAddWord),
        })
    const isOnline = useSelector(({ settingsApp }) => settingsApp.isOnline)
    const [activeButtonTranslate, setActiveButtonTranslate] =
        React.useState(false)
    const [openModalTranslate, setOpenModalTranslate] = React.useState(false)
    const [confirmTranslate, setConfirmTranslate] = React.useState(false)
    const [hideConfirmTranslate, setHideConfirmTranslate] =
        React.useState(false)

    const watchFields = watch(['word', 'translation'])

    const { word, translation, transcription } = fieldsData

    const onSubmit = (data) => {
        if (mobile) {
            redirect(WORDS_ROUTE)
        }
        setFormData(data)
        reset()
    }

    useEffect(() => {
        if (formData) {
            const collectionName = collectionNameWords.NEW
            const word = {
                ...formData,
                id: nanoid(),
                dateCreated: Timestamp.fromDate(new Date()),
                dateChange: Timestamp.fromDate(new Date()),
                knowledge: knowWord.A0.code,
                dateLearned: null,
                countRepeat: 0,
                imgUrl: null,
            }

            dispatch(addWords({ collectionName, word }))
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
            width="100%"
            sx={{
                '& .MuiTextField-root': {
                    m: mobile ? 0 : 1,
                    ml: 0,
                },
                display: 'flex',
                alignItems: 'top',
                flexDirection: mobile ? 'column' : 'row',
            }}
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
            <MyInput
                mobile={mobile}
                control={control}
                label={word.label}
                name={word.name}
            />
            <Box
                sx={{
                    mr: 2,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                alignItems="center"
            >
                <IconButton
                    disabled={activeButtonTranslate || !isOnline}
                    aria-label="translate"
                    color="secondary"
                    onClick={handleClickButtonTranslate}
                >
                    <GTranslateIcon />
                </IconButton>
            </Box>
            <MyInput
                mobile={mobile}
                control={control}
                label={translation.label}
                name={translation.name}
            />
            <MyInput
                mobile={mobile}
                control={control}
                label={transcription.label}
                name={transcription.name}
            />

            <Box sx={{ display: 'flex', gap: 3 }}>
                <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    sx={{
                        height: '50px',
                        width: mobile ? '100%' : '140px',
                        fontSize: '18px',
                        mt: '10px',
                    }}
                >
                    ADD
                </Button>
                {mobile && (
                    <Button
                        component={Link}
                        to={WORDS_ROUTE}
                        color="secondary"
                        variant="outlined"
                        type="submit"
                        sx={{
                            height: '50px',
                            width: mobile ? '100%' : '140px',
                            fontSize: '18px',
                            mt: '10px',
                        }}
                    >
                        BACK
                    </Button>
                )}
            </Box>

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
