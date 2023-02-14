import { Box, Button, styled, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { WORDS_ROUTE } from '../../utils/consts'
import { PaperLearn } from '../PaperLearn'
import { tokens } from '../../theme/theme'

const CustomButton = styled(Button)(({ theme, mbg }) => {
    const colors = tokens(theme.palette.mode)

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
        margin: '0 10px 0 0',
        a: {
            color: 'white',
            textDecoration: 'none',
        },
    }
})

const NoWords = ({ setCheckWords, countWords, recommendForLearn }) => {
    return (
        <PaperLearn>
            <Box mb={9} textAlign="center">
                <Typography variant="h4" mb={1}>
                    Not enough words to study
                </Typography>
                <Typography variant="h4" mb={1}>
                    It takes at least - {recommendForLearn}
                </Typography>
                <Typography variant="h4">Now - {countWords}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <CustomButton mbg="green" variant="contained">
                    <Link to={WORDS_ROUTE}>Added words</Link>
                </CustomButton>
                <CustomButton
                    mbg="red"
                    onClick={setCheckWords}
                    variant="contained"
                    disabled={countWords === 0}
                >
                    Still continue
                </CustomButton>
            </Box>
        </PaperLearn>
    )
}

export default NoWords
