import React, { useEffect, useState } from 'react'
import { Box, Button, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {
    learnedWordDropToInProgress,
    submitWordsForLearned,
    updateCountRepeat,
    updateKnowledgeInProcess,
} from '../../redux/slices/wordsSlice/wordsAsync'
import NoWords from './NoWords'
import VisibleWordBlock from '../VisibleWordBlock'
import HiddenWordBlock from '../HiddenWordBlock'
import { shuffleArray } from '../../utils/shuffleArray'
import { defineNextKnow } from '../../utils/defineNextKnow'
import {
    setCheckWords,
    setCurrentWordIdx,
    setMixedWords,
    setStarted,
} from '../../redux/slices/wordsSlice/wordsSlice'
import Started from '../Started'
import { checkTimeStop } from '../../utils/checkTimeStop'
import { fieldsData, knowWord } from '../../utils/consts'
import { PaperLearn } from '../PaperLearn'
import useMyTheme from '../../hooks/useMyTheme'

const LearnWordsCard = ({ method }) => {
    const dispatch = useDispatch()
    const { t } = useMyTheme()

    const inProcessWords = useSelector(({ words }) => words.inProcessWords)
    const { mixed, currentWordIdx, checkWords, isStarted } = useSelector(
        ({ words }) => words[method]
    )

    const { recommendForLearn, show } = useSelector(
        ({ settingsApp }) => settingsApp.user
    )

    const [visibilityTranslate, setVisibilityTranslate] = useState(false)

    useEffect(() => {
        const isMixed = !mixed.length || mixed.length !== inProcessWords.length

        if (currentWordIdx === 0) {
            if (isMixed) {
                mixWords()
            }

            if (inProcessWords.length < recommendForLearn) {
                dispatch(setCheckWords(true))
            } else {
                dispatch(setCheckWords(false))
            }
        }
    }, [inProcessWords])

    const mixWords = () => {
        if (inProcessWords.length > 0) {
            const mixWords = shuffleArray(inProcessWords)
            const readyForStudy = checkTimeStop(mixWords)
            dispatch(setMixedWords(readyForStudy))
        }
    }

    const nextWord = () => {
        const isLast = mixed.length - 1 === currentWordIdx
        const idx = isLast ? 0 : currentWordIdx + 1
        dispatch(setCurrentWordIdx({ data: idx, method: 'inProcess' }))
        setVisibilityTranslate(false)
        if (isLast) {
            dispatch(setMixedWords([]))
            dispatch(setStarted({ data: false, method: 'inProcess' }))
        }
    }

    const showTranslate = () => {
        setVisibilityTranslate(true)
    }

    const handleRemembered = () => {
        const word = mixed[currentWordIdx]
        const isLast = mixed.length - 1 === currentWordIdx
        const knowledge = defineNextKnow('next', word.knowledge)
        const data = { knowledge, word, isLast }

        if (word.knowledge === knowWord.C2.code) {
            const countRepeat = word.countRepeat + 1
            dispatch(updateCountRepeat({ word, countRepeat }))
        } else if (knowledge !== 'C2') {
            dispatch(updateKnowledgeInProcess(data))
        } else {
            dispatch(submitWordsForLearned(data))
        }

        nextWord()
    }

    const handleDonNotKnow = () => {
        const word = mixed[currentWordIdx]
        const isLast = mixed.length - 1 === currentWordIdx
        const knowledge = defineNextKnow('prev', word.knowledge)
        const countRepeat = 0
        const data = { knowledge, word, isLast, countRepeat }

        if (word.knowledge === knowWord.C2.code) {
            dispatch(learnedWordDropToInProgress(data))
        } else {
            dispatch(updateKnowledgeInProcess(data))
        }

        nextWord()
    }

    if (!isStarted) {
        return (
            <Started
                handle={() => {
                    dispatch(setStarted({ data: true, method: 'inProcess' }))
                }}
            />
        )
    }

    if (checkWords)
        return (
            <NoWords
                setCheckWords={() => {
                    dispatch(setCheckWords(false))
                }}
                countWords={mixed.length}
                recommendForLearn={recommendForLearn}
            />
        )

    const titleHidden =
        show === fieldsData.word.name
            ? fieldsData.translation.label
            : fieldsData.word.label

    const showHidden =
        show === fieldsData.word.name
            ? fieldsData.translation.name
            : fieldsData.word.name

    return (
        <PaperLearn>
            <Box>
                <VisibleWordBlock
                    word={mixed[currentWordIdx]}
                    isWords={mixed.length > 0}
                    title={t(fieldsData[show].label)}
                    show={show}
                />
                <Divider light />
                <HiddenWordBlock
                    word={mixed[currentWordIdx]}
                    isWords={mixed.length > 0}
                    visibility={visibilityTranslate}
                    onVisible={showTranslate}
                    title={t(titleHidden)}
                    show={showHidden}
                />
                <Divider light />
                <Box
                    aria-label=""
                    mt={2}
                    sx={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'space-between',
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Button
                    disabled={!mixed.length}
                    variant="contained"
                    color="secondary"
                    onClick={handleRemembered}
                    sx={{
                        fontSize: '12px',
                        textTransform: 'initial',
                        width: '130px',
                    }}
                >
                    {t('Remembered')}
                </Button>
                <Button
                    disabled={!mixed.length}
                    variant="contained"
                    color="secondary"
                    onClick={handleDonNotKnow}
                    sx={{
                        fontSize: '12px',
                        textTransform: 'initial',
                        width: '130px',
                    }}
                >
                    {t(`Don't know`)}
                </Button>
            </Box>
        </PaperLearn>
    )
}

export default LearnWordsCard
