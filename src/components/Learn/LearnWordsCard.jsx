import React, { useEffect, useRef, useState } from 'react'
import { Box, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from 'react-hook-form'
import {
    learnedWordDropToInProgress,
    submitWordsForLearned,
    submitWordsForStudy,
    updateCountRepeat,
    updateKnowledgeInProcess,
} from '../../redux/slices/wordsSlice/wordsAsync'
import NoWordsLearn from './NoWords/NoWordsLearn'
import VisibleWordBlock from './VisibleWordBlock'
import HiddenWordBlock from './HiddenWordBlock'
import { shuffleArray } from '../../utils/shuffleArray'
import { defineNextKnow } from '../../utils/defineNextKnow'
import {
    setCheckWords,
    setCurrentWordIdx,
    setMixedWords,
    setStarted,
} from '../../redux/slices/wordsSlice/wordsSlice'
import Started from './Started'
import { checkTimeStop } from '../../utils/checkTimeStop'
import { fieldsData, knowWord } from '../../utils/consts'
import { PaperLearn } from '../PaperLearn'
import useMyTheme from '../../hooks/useMyTheme'
import Buttons from './Buttons'
import InputAnswer from './InputAnswer'
import { setDisabledInput } from '../../redux/slices/settingsAppSlice/settingsAppSlice'

const sortArray = (nums) => {
    const negativeNums = nums.filter((num) => num.dateCreated < 0)
    const positiveNums = nums.filter((num) => num.dateCreated >= 0)

    const sortedNegative = negativeNums.sort(
        (a, b) => a.dateCreated - b.dateCreated
    )
    const sortedPositive = positiveNums.sort(
        (a, b) => a.dateCreated - b.dateCreated
    )

    return sortedNegative.concat(sortedPositive)
}

const LearnWordsCard = ({ method }) => {
    const inputAnswerRef = useRef(null)
    const dispatch = useDispatch()
    const { t } = useMyTheme()

    // const [isDisabledInput, setDisableInput] = useState(false)
    const { inProcessWords, newWords } = useSelector(({ words }) => words)
    const { mixed, currentWordIdx, checkWords, isStarted } = useSelector(
        ({ words }) => words[method]
    )

    const { control: controlAnswer, reset: resetInputAnswer, watch } = useForm()
    const answerData = watch(['answer'])[0]

    const { recommendForLearn, show, isEaseMode } = useSelector(
        ({ settingsApp }) => settingsApp.user
    )
    const { isDisabledInput } = useSelector(
        ({ settingsApp }) => settingsApp.wordLearn
    )
    const handleHideKeyboard = () => {
        if (inputAnswerRef.current) {
            inputAnswerRef.current.blur()
        }
    }
    const isCorrectAnswer =
        answerData?.trim()?.toLowerCase() ===
        mixed[currentWordIdx]?.word?.trim()?.toLowerCase()

    useEffect(() => {
        if (isCorrectAnswer) {
            handleHideKeyboard()
        }
    }, [isCorrectAnswer])

    useEffect(() => {
        return () => {
            dispatch(setDisabledInput(false))
        }
    }, [])

    const [visibilityTranslate, setVisibilityTranslate] = useState(false)

    const addWords = () => {
        const countAddedWords = recommendForLearn - mixed.length

        let wordsForAdded = []
        let countAdded = 0
        if (countAddedWords <= 0 || !newWords.length) return [[], 0]

        if (newWords.length > 1 && newWords.length >= countAddedWords) {
            const sortOnDate = sortArray(newWords)
            wordsForAdded = sortOnDate.splice(0, countAddedWords)
            countAdded = countAddedWords
        } else {
            wordsForAdded = newWords
            countAdded = newWords.length
        }

        wordsForAdded.forEach((el) => {
            if (el.knowledge === knowWord.A0.code) {
                dispatch(submitWordsForStudy(el))
            }
        })

        return [wordsForAdded, countAdded, countAddedWords]
    }

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
    }, [inProcessWords, isStarted])

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
        if (!isCorrectAnswer) {
            dispatch(setDisabledInput(true))
        }
        setVisibilityTranslate(true)
    }
    const hiddenTranslate = () => {
        setVisibilityTranslate(false)
    }

    const handleRemembered = () => {
        resetInputAnswer()
        dispatch(setDisabledInput(false))
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
        resetInputAnswer()
        dispatch(setDisabledInput(false))
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

    if (checkWords || !mixed.length)
        return (
            <NoWordsLearn
                setCheckWords={() => {
                    dispatch(setCheckWords(false))
                }}
                countWords={mixed.length}
                recommendForLearn={recommendForLearn}
                addWords={addWords}
                newWords={newWords}
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

    const handleClickCheckWord = () => {}

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
                    isEaseMode={false}
                    isCorrectAnswer={isCorrectAnswer}
                    hiddenTranslate={hiddenTranslate}
                />
                <Divider light />
                {/* <Button onClick={hiddenTranslate}>Show</Button> */}
                <InputAnswer
                    handleClick={handleClickCheckWord}
                    word={mixed[currentWordIdx]}
                    control={controlAnswer}
                    title="Answer"
                    isDisabledInput={isDisabledInput}
                    inputAnswerRef={inputAnswerRef}
                />
                {/* ss */}
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
            <Buttons
                handleDonNotKnow={handleDonNotKnow}
                handleRemembered={handleRemembered}
                isCorrectAnswer={isCorrectAnswer}
                isEaseMode={isEaseMode}
                isDisabledInput={isDisabledInput}
            />
        </PaperLearn>
    )
}

export default LearnWordsCard
