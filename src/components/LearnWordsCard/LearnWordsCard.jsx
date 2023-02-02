import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {
    fetchWords,
    submitWordsForLearned,
    updateKnowledgeInProcess,
} from '../../redux/slices/wordsSlice/wordsAsync'
import { collectionNameWords } from '../../utils/consts'
import NoWords from './NoWords'
import TranslationBlock from './TranslationBlock'
import WordBlock from './WordBlock'
import { defineNextKnow, shuffleArray } from '../../utils/utils'
import {
    setCheckWords,
    setCurrentWordIdx,
    setMixedWords,
    setStarted,
} from '../../redux/slices/wordsSlice/wordsSlice'
import useMyTheme from '../../hooks/useMyTheme'
import Started from './Started'

const LearnWordsCard = () => {
    const dispatch = useDispatch()
    const { colors } = useMyTheme()

    const {
        inProcessWords,
        mixedWords,
        currentWordIdx,
        checkWords,
        isStarted,
    } = useSelector(({ words }) => words)
    const { recommendForLearn } = useSelector(({ settingsApp }) => settingsApp)

    const [visibilityTranslate, setVisibilityTranslate] = useState(false)

    useEffect(() => {
        if (!mixedWords.length) {
            dispatch(fetchWords([collectionNameWords.IN_PROCESS]))
        }
    }, [])
    useEffect(() => {
        if (!mixedWords.length) {
            dispatch(fetchWords([collectionNameWords.IN_PROCESS]))
        }
    }, [mixedWords])

    useEffect(() => {
        const isMixed =
            !mixedWords.length || mixedWords.length !== inProcessWords.length

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
            dispatch(setMixedWords(shuffleArray(inProcessWords)))
        }
    }

    const nextWord = () => {
        const isLast = mixedWords.length - 1 === currentWordIdx
        const idx = isLast ? 0 : currentWordIdx + 1
        dispatch(setCurrentWordIdx(idx))
        setVisibilityTranslate(false)
        if (isLast) {
            dispatch(setMixedWords([]))
            dispatch(setStarted(false))
            setVisibilityTranslate(false)
        }
    }

    const showTranslate = () => {
        setVisibilityTranslate(true)
    }

    const handleRemembered = () => {
        const word = mixedWords[currentWordIdx]
        const isLast = mixedWords.length - 1 === currentWordIdx
        const knowledge = defineNextKnow('next', word.knowledge)
        const data = { knowledge, word, isLast }
        if (knowledge !== 'C2') {
            dispatch(updateKnowledgeInProcess(data))
        } else {
            dispatch(submitWordsForLearned(data))
        }

        nextWord()
    }
    const handleDonNotKnow = () => {
        const word = mixedWords[currentWordIdx]
        const isLast = mixedWords.length - 1 === currentWordIdx
        const knowledge = defineNextKnow('prev', word.knowledge)
        const data = { knowledge, word, isLast }

        dispatch(updateKnowledgeInProcess(data))
        nextWord()
    }

    if (!isStarted) {
        return (
            <Started
                handle={() => {
                    dispatch(setStarted(true))
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
                countWords={mixedWords.length}
                recommendForLearn={recommendForLearn}
            />
        )

    return (
        <Box sx={{ maxWidth: '400px', margin: '0 auto ' }}>
            <Typography variant="h4" color="" mb={3}>
                Learn new words
            </Typography>
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
                        word={mixedWords[currentWordIdx]}
                        isWords={mixedWords.length > 0}
                    />
                    <Divider light />
                    <WordBlock
                        word={mixedWords[currentWordIdx]}
                        isWords={mixedWords.length > 0}
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
                            disabled={!mixedWords.length}
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
                            disabled={!mixedWords.length}
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

export default LearnWordsCard
