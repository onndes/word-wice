import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import { nanoid } from 'nanoid'
import { Timestamp } from 'firebase/firestore'
import { Link, redirect } from 'react-router-dom'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { useTranslation } from 'react-i18next'
import {
    addWords,
    translateWord,
} from '../../redux/slices/wordsSlice/wordsAsync'
import { schemaFormAddWord } from '../../utils/schemaFormAddWord'
import MyInput from './MyInput'
import MyAlertDialogSlide from '../MyAlertDialogSlide'
import { collectionNameWords, fieldsData, knowWord } from '../../utils/consts'
import useMyTheme from '../../hooks/useMyTheme'
import MyButton from '../MyButton'
import { BASE_WORDS_ROUTE, WORDS_ROUTE } from '../../common/consts/ROUTES'

const AddWord = () => {
    const { mq, t, colors } = useMyTheme()
    const { i18n } = useTranslation()
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
        if (mq) {
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
        const lang = i18n.language === 'ua' ? 'uk' : 'ru'
        if (!wordRu && wordEng) {
            setValue(translation.name, '')
            translateWord(wordEng, 'en', lang).then((e) =>
                setValue(translation.name, e)
            )
        } else if (!wordEng && wordRu) {
            setValue(word.name, '')
            translateWord(wordRu, lang, 'en').then((e) => {
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
                    m: mq ? 0 : 1,
                    ml: 0,
                },
                display: 'flex',
                alignItems: 'top',
                flexDirection: mq ? 'column' : 'row',
            }}
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
            <MyInput
                mq={mq}
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
                    justifyContent: mq ? 'center' : 'space-between',
                }}
                alignItems="center"
                justifyContent="center"
            >
                <IconButton
                    disabled={activeButtonTranslate || !isOnline}
                    aria-label="translate"
                    color="primary"
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

            <Box sx={{ display: 'flex', gap: 2 }}>
                {mq && (
                    <MyButton
                        component={Link}
                        to={WORDS_ROUTE}
                        color="secondary"
                        variant="contained"
                        type="submit"
                        sx={{
                            height: '50px',
                            width: mq ? '100%' : '140px',
                            fontSize: '18px',
                            mt: '10px',
                        }}
                    >
                        {t('Back')}
                    </MyButton>
                )}
                <MyButton
                    type="submit"
                    sx={{
                        height: '50px',
                        width: mq ? '100%' : '140px',
                        fontSize: '18px',
                        mt: '10px',
                    }}
                >
                    {t('Add')}
                </MyButton>
                {!mq && (
                    <Box>
                        <Button
                            component={Link}
                            to={BASE_WORDS_ROUTE}
                            variant="contained"
                            size="large"
                            sx={{
                                mt: '12px',
                                background: colors.orange[600],
                                display: 'flex',
                                fontWeight: 600,
                                borderRadius: '50%',

                                backdropFilter: 'blur(4px)',
                                height: '45px',
                                width: '45px',
                                minWidth: '0px',
                                '&:hover': {
                                    backgroundColor: colors.orange[500],
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', pl: '2px', pb: '2px' }}>
                                <PostAddIcon fontSize="large" />
                            </Box>
                        </Button>
                    </Box>
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
