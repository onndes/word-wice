import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { LEARN_NEW_ROUTE, LEARN_REPEAT_ROUTE } from '../../common/consts/ROUTES'
import { setReadyForStudyAndRepeat } from '../../redux/slices/wordsSlice/wordsSlice'
import { checkTimeStop } from '../../utils/checkTimeStop'
import useMyTheme from '../../hooks/useMyTheme'
import StudyModeToggle from './components/StudyModeToggle'
import { setEaseMode } from '../../redux/slices/settingsAppSlice/settingsAppSlice'

window.responsiveVoice.speak()
const ButtonLearn = ({ children, bgc, bgch, to, ...otherProps }) => {
    return (
        <Button
            sx={() => ({
                display: 'block',
                textAlign: 'center',
                fontWeight: 600,
                color: 'white',
                backgroundColor: bgc,
                '&:hover': {
                    backgroundColor: bgch,
                },
                mb: 2,
                pt: 3,
                pb: 2,
            })}
            component={Link}
            to={to}
            variant="contained"
            color="primary"
            size="large"
            {...otherProps}
        >
            {children}
        </Button>
    )
}

const WordsCount = ({ count, color }) => {
    const { t } = useMyTheme()
    return (
        <>
            <Typography
                variant="span"
                color={color}
                fontWeight={600}
                backgroundColor="white"
                padding="2px 6px"
                borderRadius="5px"
            >
                {count} {t('word(s)')}
            </Typography>{' '}
        </>
    )
}

const LearnWords = () => {
    const dispatch = useDispatch()
    const { colors, t } = useMyTheme()

    const { inProcess, learned, inProcessWords, learnedWords } = useSelector(
        ({ words }) => words
    )
    const { isEaseMode } = useSelector(({ settingsApp }) => settingsApp.user)

    const handleClickSwitchMode = () => {
        dispatch(setEaseMode(!isEaseMode))
    }

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
            <StudyModeToggle
                isEasyMode={isEaseMode}
                onToggle={() => handleClickSwitchMode()}
            />
            <ButtonLearn
                bgc={colors.emerald[500]}
                bgch={colors.emerald[600]}
                to={LEARN_NEW_ROUTE}
            >
                <Typography variant="p" display="block" letterSpacing={0.3}>
                    {t('Learn new words')}
                </Typography>
                <Typography variant="p" letterSpacing={0.3}>
                    <WordsCount
                        count={inProcess.readyWordCount}
                        color={colors.emerald[600]}
                    />
                    {t(`for study is ready`)}
                </Typography>
            </ButtonLearn>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pt={1}
                mb={1}
                flexDirection="row"
                gap={1}
                // wrap="wrap"
            >
                <Typography variant="subtitle2" color="success.main">
                    {t('💪 Only normal mode')}
                </Typography>
            </Box>
            <ButtonLearn
                bgc={colors.indigo[500]}
                bgch={colors.indigo[600]}
                to={LEARN_REPEAT_ROUTE}
            >
                <Typography variant="p" display="block" letterSpacing={0.3}>
                    {t('Repeat learned words')}
                </Typography>
                <Typography variant="p" letterSpacing={0.3}>
                    <WordsCount
                        count={learned.readyWordCount}
                        color={colors.indigo[600]}
                    />

                    {t('for repeat is ready')}
                </Typography>
            </ButtonLearn>
        </Container>
    )
}

export default LearnWords
