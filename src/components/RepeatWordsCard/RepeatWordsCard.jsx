import React, { useEffect, useState } from 'react'
import { Box, Paper, Button, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {
    learnedWordDropToInProgress,
    updateCountRepeat,
} from '../../redux/slices/wordsSlice/wordsAsync'
import NoWords from './NoWords'
import TranslationBlock from './TranslationBlock'
import WordBlock from './WordBlock'
import { defineNextKnow } from '../../utils/defineNextKnow'
import {
    setCurrentWordIdx,
    setRepeatWord,
    setStarted,
} from '../../redux/slices/wordsSlice/wordsSlice'
import useMyTheme from '../../hooks/useMyTheme'
import { checkTimeStop } from '../../utils/checkTimeStop'
import Started from './Started'

const RepeatWordsCard = () => {
    const dispatch = useDispatch()
    const { colors } = useMyTheme()

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
        <Box sx={{ maxWidth: '400px', margin: '0 auto ' }}>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                    background: colors.primary[400],
                    maxWidth: '400px',
                    margin: '0 auto ',
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: '1 1 auto',
                }}
            >
                <Box sx={{ padding: '20px' }}>
                    <TranslationBlock
                        word={repeatWords[currentWordIdx]}
                        isWords={repeatWords.length > 0}
                    />
                    <Divider light />
                    <WordBlock
                        word={repeatWords[currentWordIdx]}
                        isWords={repeatWords.length > 0}
                        visibility={visibilityTranslate}
                        show={showTranslate}
                    />
                    <Divider light />
                    <Box
                        color="primary"
                        aria-label=""
                        mt={2}
                        sx={{ display: 'flex', gap: '20px' }}
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
                            Remembered
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
                            Don{`'`}t know
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default RepeatWordsCard
