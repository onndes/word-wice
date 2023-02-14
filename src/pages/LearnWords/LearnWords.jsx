import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { LEARN_NEW_ROUTE, LEARN_REPEAT_ROUTE } from '../../utils/consts'
import { setReadyForStudyAndRepeat } from '../../redux/slices/wordsSlice/wordsSlice'
import { checkTimeStop } from '../../utils/checkTimeStop'
import useMyTheme from '../../hooks/useMyTheme'

const LearnWords = () => {
    const dispatch = useDispatch()
    const { colors } = useMyTheme()
    const { inProcess, learned, inProcessWords, learnedWords } = useSelector(
        ({ words }) => words
    )

    useEffect(() => {
        const readyForStudy = checkTimeStop(inProcessWords)
        dispatch(
            setReadyForStudyAndRepeat({
                count: readyForStudy.length,
                method: 'inProcess',
            })
        )
    }, [inProcessWords])

    useEffect(() => {
        const readyForRepeat = checkTimeStop(learnedWords)
        dispatch(
            setReadyForStudyAndRepeat({
                count: readyForRepeat.length,
                method: 'learned',
            })
        )
    }, [learnedWords])

    return (
        <Container maxWidth="xs">
            <Button
                sx={() => ({
                    display: 'block',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'white',
                    backgroundColor: colors.emerald[500],
                    '&:hover': {
                        backgroundColor: colors.emerald[600],
                    },
                    mb: 2,
                    pt: 3,
                    pb: 3,
                })}
                component={Link}
                to={LEARN_NEW_ROUTE}
                variant="contained"
                color="primary"
                size="large"
            >
                <Typography variant="p" display="block">
                    Learn new words
                </Typography>
                <Typography variant="p">
                    {inProcess.readyWordCount} word(s) for study is ready
                </Typography>
            </Button>
            <Button
                sx={() => ({
                    display: 'block',
                    backgroundColor: colors.indigo[500],
                    textAlign: 'center',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: colors.indigo[600],
                    },
                    mb: 2,
                    pt: 3,
                    pb: 3,
                })}
                component={Link}
                to={LEARN_REPEAT_ROUTE}
                variant="contained"
                color="primary"
                size="large"
            >
                <Typography variant="p" display="block">
                    Repeat learned words
                </Typography>
                <Typography variant="p">
                    {learned.readyWordCount} word(s) for study is ready
                </Typography>
            </Button>
        </Container>
    )
}

export default LearnWords
