import { Box, Button, styled, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { WORDS_ROUTE } from '../../utils/consts'
import { PaperLearn } from '../PaperLearn'
import useMyTheme from '../../hooks/useMyTheme'

const CustomButton = styled(Button)(({ theme, mbg }) => {
    const { colors, mq } = useMyTheme()
    const bgRed = mbg === 'red' && colors.redAccent[500]
    const bgRedHover = mbg === 'red' && colors.redAccent[600]
    const bgGreen = mbg === 'green' && colors.greenAccent[600]
    const bgGreenHover = mbg === 'green' && colors.greenAccent[700]

    return {
        backgroundColor: bgRed || bgGreen || theme.palette.primary,
        color: 'white',
        fontWeight: 600,
        '&:hover': {
            backgroundColor:
                bgRedHover || bgGreenHover || theme.palette.primary,
        },
        a: {
            color: 'white',
            textDecoration: 'none',
        },
        '&:focus': mq && {
            // eslint-disable-next-line max-len
            boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
        },
    }
})

const NoWords = ({
    setCheckWords,
    countWords,
    recommendForLearn,
    newWords,
    addWords,
}) => {
    const { t } = useMyTheme()
    return (
        <PaperLearn>
            <Box mb={9} textAlign="center">
                <Typography variant="h4" mb={1}>
                    {t('Not enough words to study')}
                </Typography>
                <Typography variant="h4" mb={1}>
                    {t('It takes at least')} - {recommendForLearn}
                </Typography>
                <Typography variant="h4">
                    {t('Now')} - {countWords}
                </Typography>
            </Box>
            <Box mb={4}>
                <Box display="flex" justifyContent="center" mb={2}>
                    <CustomButton
                        fullWidth
                        mbg="green"
                        onClick={() => addWords()}
                        variant="contained"
                        disabled={!newWords.length}
                    >
                        {t('Add')}, {t('Available')}: {newWords.length}
                    </CustomButton>
                </Box>
                <Box
                    display="grid"
                    justifyContent="space-between"
                    gap={2}
                    gridTemplateColumns="3fr 2fr"
                >
                    <CustomButton variant="contained">
                        <Link to={WORDS_ROUTE}>{t('Add selectively')}</Link>
                    </CustomButton>
                    <CustomButton
                        mbg="red"
                        onClick={setCheckWords}
                        variant="contained"
                        disabled={countWords === 0}
                    >
                        {t('Still continue')}
                    </CustomButton>
                </Box>
            </Box>
        </PaperLearn>
    )
}

export default NoWords
