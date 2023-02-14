import { Box, styled } from '@mui/material'
import React from 'react'
import { knowWord } from '../utils/consts'

const BoxCustom = styled(Box)(({ word, bg }) => ({
    color: word.knowledge === knowWord.A0.code ? 'black' : 'white',
    background: bg,
    padding: '3px 10px',
    fontWeight: 500,
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
    width: '110px',
    letterSpacing: '1px',
    borderRadius: '5px',
    border: word.knowledge === knowWord.A0.code && '1px solid grey',
}))

const WordRank = ({ word }) => {
    const bg =
        // eslint-disable-next-line no-nested-ternary
        word.countRepeat > 5
            ? '#d1c610'
            : word.countRepeat > 10
            ? '#000000'
            : knowWord[word.knowledge].color
    return (
        <BoxCustom bg={bg} word={word}>
            {knowWord[word.knowledge].tittle}{' '}
            {word.countRepeat ? `(${word.countRepeat})` : null}
        </BoxCustom>
    )
}

export default WordRank
