import React, { useEffect, useState } from 'react'
import { Box, Button, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {
    learnedWordDropToInProgress,
    updateCountRepeat,
} from '../../redux/slices/wordsSlice/wordsAsync'
import NoWords from './NoWords'
import VisibleWordBlock from '../VisibleWordBlock'
import HiddenWordBlock from '../HiddenWordBlock'
import { defineNextKnow } from '../../utils/defineNextKnow'
import {
    setCurrentWordIdx,
    setRepeatWord,
    setStarted,
} from '../../redux/slices/wordsSlice/wordsSlice'
import { checkTimeStop } from '../../utils/checkTimeStop'
import Started from '../Started'
import { fieldsData } from '../../utils/consts'
import { PaperLearn } from '../PaperLearn'
import useMyTheme from '../../hooks/useMyTheme'

const RepeatWordsCard = () => {
    const dispatch = useDispatch()
    const { t } = useMyTheme()

    const learnedWords = useSelector(({ words }) => words.learnedWords)
    const { repeatWords, isStarted, currentWordIdx } = useSelector(
        ({ words }) => words.learned
    )
    const [visibilityTranslate, setVisibilityTranslate] = useState(false)

    const setWord = () => {
        if (!learnedWords.length) return
        const words = checkTimeStop(learnedWords)
        dispatch(setRepeatWord(words))
    }

    useEffect(() => {
        const isMixed = !repeatWords.length && !isStarted
        if (currentWordIdx === 0 && isMixed) {
            setWord()
        }
    }, [learnedWords])

    const nextWord = () => {
        const isLast = repeatWords.length - 1 === currentWordIdx
        const idx = isLast ? 0 : currentWordIdx + 1
        dispatch(setCurrentWordIdx({ data: idx, method: 'learned' }))
        setVisibilityTranslate(false)
        if (isLast) {
            dispatch(setRepeatWord([]))
            dispatch(setStarted({ data: false, method: 'learned' }))
        }
    }

    const showTranslate = () => {
        setVisibilityTranslate(true)
    }

    const handleRemembered = () => {
        const word = repeatWords[currentWordIdx]
        const countRepeat = repeatWords[currentWordIdx].countRepeat + 1
        dispatch(updateCountRepeat({ word, countRepeat }))
        nextWord()
    }

    const handleDonNotKnow = () => {
        const word = repeatWords[currentWordIdx]
        const knowledge = defineNextKnow('prev', repeatWords.knowledge)
        const countRepeat = 0
        const data = { knowledge, word, countRepeat }
        dispatch(learnedWordDropToInProgress(data))
        nextWord()
    }

    if (!isStarted && repeatWords.length) {
        return (
            <Started
                handle={() => {
                    dispatch(setStarted({ data: true, method: 'learned' }))
                }}
            />
        )
    }

    if (!repeatWords.length) return <NoWords />

    return (
        <PaperLearn>
            <Box>
                <VisibleWordBlock
                    word={repeatWords[currentWordIdx]}
                    isWords={repeatWords.length > 0}
                    title={t(fieldsData.translation.label)}
                    show={fieldsData.translation.name}
                />
                <Divider light />
                <HiddenWordBlock
                    word={repeatWords[currentWordIdx]}
                    isWords={repeatWords.length > 0}
                    visibility={visibilityTranslate}
                    onVisible={showTranslate}
                    title={t(fieldsData.word.label)}
                    show={fieldsData.word.name}
                />
                <Divider light />
            </Box>
            <Box
                color="primary"
                aria-label=""
                mt={2}
                sx={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    disabled={!repeatWords}
                    variant="contained"
                    color="primary"
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
                    disabled={!repeatWords}
                    variant="contained"
                    color="primary"
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

export default RepeatWordsCard
