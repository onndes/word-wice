import React, { useEffect, useState } from 'react'
import { Box, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {
    learnedWordDropToInProgress,
    updateCountRepeat,
} from '../../redux/slices/wordsSlice/wordsAsync'
import NoWordsRepeat from './NoWords/NoWordsRepeat'
import VisibleWordBlock from './VisibleWordBlock'
import HiddenWordBlock from './HiddenWordBlock'
import { defineNextKnow } from '../../utils/defineNextKnow'
import {
    setCurrentWordIdx,
    setLearnedWords,
    setRepeatWord,
    setStarted,
} from '../../redux/slices/wordsSlice/wordsSlice'
import { checkTimeStop } from '../../utils/checkTimeStop'
import Started from './Started'
import { fieldsData } from '../../utils/consts'
import { PaperLearn } from '../PaperLearn'
import useMyTheme from '../../hooks/useMyTheme'
import ConfirmDialog from '../ConfirmDialog'
import Buttons from './Buttons'

const RepeatWordsCard = () => {
    const dispatch = useDispatch()
    const { t } = useMyTheme()

    const learnedWords = useSelector(({ words }) => words.learnedWords)
    const { repeatWords, isStarted, currentWordIdx } = useSelector(
        ({ words }) => words.learned
    )
    const [visibilityTranslate, setVisibilityTranslate] = useState(false)
    const [confirmDonNotKnow, setConfirmDonNotKnow] = useState(false)

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
    }, [learnedWords, isStarted])

    const nextWord = () => {
        const isLast = repeatWords.length - 1 === currentWordIdx
        const idx = isLast ? 0 : currentWordIdx + 1
        dispatch(setCurrentWordIdx({ data: idx, method: 'learned' }))
        setVisibilityTranslate(false)
        if (isLast) {
            dispatch(setRepeatWord([]))
            dispatch(setLearnedWords([]))
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
        const knowledge = defineNextKnow('prev', word.knowledge)
        const countRepeat = 0
        const data = { knowledge, word, countRepeat }
        dispatch(learnedWordDropToInProgress(data))
        nextWord()
    }

    if (!repeatWords.length) return <NoWordsRepeat />

    if (!isStarted && repeatWords.length) {
        return (
            <Started
                handle={() => {
                    dispatch(setStarted({ data: true, method: 'learned' }))
                }}
            />
        )
    }
    return (
        <>
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
                <Buttons
                    handleDonNotKnow={() => setConfirmDonNotKnow(true)}
                    handleRemembered={handleRemembered}
                />
            </PaperLearn>
            <ConfirmDialog
                text={t("Are you sure you don't remember this word?")}
                open={confirmDonNotKnow}
                setOpen={setConfirmDonNotKnow}
                onConfirm={handleDonNotKnow}
                onRefute={() => setConfirmDonNotKnow(false)}
            />
        </>
    )
}

export default RepeatWordsCard
