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

const LearnWordsCard = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { inProcessWords } = useSelector(({ words }) => words)

    const [words, setWords] = useState([])
    const [checkWords, setCheckWords] = useState(false)
    const [currentWordIdx, setCurrentWordIdx] = useState(0)
    const [visibilityTranslate, setVisibilityTranslate] = useState(false)

    useEffect(() => {
        dispatch(fetchWords([collectionNameWords.IN_PROCESS]))
    }, [])

    useEffect(() => {
        mixWords()
    }, [inProcessWords])

    const mixWords = () => {
        if (inProcessWords.length < 5) setCheckWords(true)
        if (inProcessWords.length > 0)
            setWords(shuffleArray([...inProcessWords]))
    }

    const nextWord = () => {
        setCurrentWordIdx((prevState) => {
            if (words.length - 1 === prevState) return 0
            return prevState + 1
        })
        setVisibilityTranslate(false)
    }

    const showTranslate = () => {
        setVisibilityTranslate(true)
    }

    const handleRemembered = () => {
        const knowledge = defineNextKnow(
            'next',
            words[currentWordIdx].knowledge
        )
        const data = {
            knowledge,
            word: words[currentWordIdx],
            fetchWords: currentWordIdx === words.length - 1,
        }
        if (knowledge !== 'C2') {
            dispatch(updateRankInProcessWord(data))
        } else {
            dispatch(submitWordsForLearned(data))
        }
        if (currentWordIdx === words.length - 1) {
            setWords([])
            setCurrentWordIdx(0)
            setVisibilityTranslate(false)
        } else {
            nextWord()
        }
    }
    const handleDonNotKnow = () => {
        const knowledge = defineNextKnow(
            'prev',
            words[currentWordIdx].knowledge
        )
        const data = {
            knowledge,
            word: words[currentWordIdx],
            fetchWords: currentWordIdx === words.length - 1,
        }
        if (knowledge !== 'A1' && currentWordIdx === words.length - 1) {
            dispatch(fetchWords([collectionNameWords.IN_PROCESS]))
        } else {
            dispatch(updateRankInProcessWord(data))
        }
        if (currentWordIdx !== words.length - 1) {
            nextWord()
        }
    }

    if (checkWords)
        return (
            <NoWords setCheckWords={setCheckWords} countWords={words.length} />
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
                        word={words[currentWordIdx]}
                        isWords={words.length > 0}
                    />
                    <Divider light />
                    <WordBlock
                        word={words[currentWordIdx]}
                        isWords={words.length > 0}
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
                            disabled={!words.length}
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
                            disabled={!words.length}
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
