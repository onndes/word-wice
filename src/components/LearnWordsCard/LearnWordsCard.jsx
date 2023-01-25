import React, { useEffect, useState } from 'react'
import {
    Box,
    Paper,
    Typography,
    useTheme,
    Button,
    Divider,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {
    fetchWords,
    submitWordsForLearned,
    updateRankInProcessWord,
} from '../../redux/slices/wordsSlice/wordsAsync'
import { tokens } from '../../theme/theme'
import { collectionNameWords } from '../../utils/consts'
import NoWords from './NoWords'
import TranslationBlock from './TranslationBlock'
import WordBlock from './WordBlock'
import { defineNextKnow, shuffleArray } from '../../utils/utils'
import {
    setCurrentWordIdx,
    setMixedWords,
} from '../../redux/slices/wordsSlice/wordsSlice'

const LearnWordsCard = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { inProcessWords, mixedWords, currentWordIdx } = useSelector(
        ({ words }) => words
    )

    const [isMixWords, setIsMixWords] = useState(false)
    const [checkWords, setCheckWords] = useState(false)
    const [visibilityTranslate, setVisibilityTranslate] = useState(false)

    useEffect(() => {
        if (!mixedWords.length) {
            dispatch(fetchWords([collectionNameWords.IN_PROCESS]))
            setIsMixWords(true)
        }
    }, [])

    useEffect(() => {
        if (currentWordIdx === 0) mixWords()
    }, [inProcessWords])

    const mixWords = () => {
        if (inProcessWords.length < 5) setCheckWords(true)
        if (inProcessWords.length > 0)
            dispatch(setMixedWords(shuffleArray([...inProcessWords])))
    }

    const nextWord = () => {
        const isLast = mixedWords.length - 1 === currentWordIdx
        const idx = isLast ? 0 : currentWordIdx + 1
        dispatch(setCurrentWordIdx(idx))
        setVisibilityTranslate(false)
        if (isLast) {
            dispatch(setMixedWords([]))
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
            dispatch(updateRankInProcessWord(data))
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
        dispatch(updateRankInProcessWord(data))
        nextWord()
    }

    if (checkWords)
        return (
            <NoWords
                setCheckWords={setCheckWords}
                countWords={mixedWords.length}
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
                            I remembered
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
                            Show more
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default LearnWordsCard
