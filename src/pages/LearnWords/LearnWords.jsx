import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { LEARN_NEW_ROUTE, LEARN_REPEAT_ROUTE } from '../../utils/consts'
import {
    setReadyForStudyCount,
} from '../../redux/slices/wordsSlice/wordsSlice'
import { checkTimeStop } from '../../utils/checkTimeStop'

const LearnWords = () => {
    const dispatch = useDispatch()
    const { readyForStudyCount, inProcessWords } = useSelector(
        ({ words }) => words
    )

    useEffect(() => {
        const readyForStudy = checkTimeStop(inProcessWords)
        dispatch(setReadyForStudyCount(readyForStudy.length))
    }, [inProcessWords])
    return (
        <Container maxWidth="xs">
            <Button
                sx={(theme) => ({
                    display: 'block',
                    textAlign: 'center',
                    fontWeight: 600,
                    backgroundColor: theme.palette.button.default,
                    '&:hover': {
                        backgroundColor: theme.palette.button.hover,
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
                <Typography variant="p" color="initial" display="block">
                    Learn new words
                </Typography>
                <Typography variant="p" color="initial">
                    {readyForStudyCount} word(s) for study is ready
                </Typography>
            </Button>
            <Button
                sx={(theme) => ({
                    display: 'block',
                    backgroundColor: theme.palette.purple.default,
                    textAlign: 'center',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: theme.palette.purple.hover,
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
                Repeat learned words
            </Button>
        </Container>
    )
}

export default LearnWords
