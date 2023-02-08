import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
// eslint-disable-next-line max-len
import { setSelected } from '../../../redux/slices/settingsAppSlice/settingsAppSlice'
import {
    deleteWords,
    submitWordsForStudy,
} from '../../../redux/slices/wordsSlice/wordsAsync'
import { collectionNameWords, knowWord } from '../../../utils/consts'

const ToolbarWordsCards = () => {
    const dispatch = useDispatch()
    const { selected } = useSelector(({ settingsApp }) => settingsApp.wordsList)

    const handleClickDeleteWords = () => {
        selected.forEach((el) => {
            let name = ''
            if (el.knowledge === knowWord.A0.code) {
                name = collectionNameWords.NEW
            } else if (el.knowledge === knowWord.C2.code) {
                name = collectionNameWords.LEARNED
            } else {
                name = collectionNameWords.IN_PROCESS
            }

            dispatch(
                deleteWords({
                    collectionName: name,
                    words: [el],
                })
            )
        })
        dispatch(setSelected([]))
    }

    const handleSubmitWordsForStudy = () => {
        selected.forEach((el) => {
            if (el.knowledge === knowWord.A0.code) {
                dispatch(submitWordsForStudy(el))
            }
        })
        dispatch(setSelected([]))
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                {selected.length} selected
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <Tooltip title="Add to study">
                    <IconButton onClick={handleSubmitWordsForStudy}>
                        <AddBoxIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={handleClickDeleteWords}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default ToolbarWordsCards
