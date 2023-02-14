import React, { useState } from 'react'
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
import ConfirmDialog from '../../ConfirmDialog'

const ToolbarWordsCards = () => {
    const dispatch = useDispatch()
    const { selected } = useSelector(({ settingsApp }) => settingsApp.wordsList)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [openConfirmWordsForStudy, setOpenConfirmWordsForStudy] =
        useState(false)

    const handleClearSelected = () => dispatch(setSelected([]))

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
        handleClearSelected()
    }

    const handleSubmitWordsForStudy = () => {
        selected.forEach((el) => {
            if (el.knowledge === knowWord.A0.code) {
                dispatch(submitWordsForStudy(el))
            }
        })
        handleClearSelected()
    }

    const messageConfirmForStudy = `Are you certain that you wish to add these 
      ${selected.filter((el) => el.knowledge === knowWord.A0.code).length}
      word(s) to your study list?`
    const messageConfirmDelete = `Are you certain that you wish to 
      remove these ${selected.length} word(s) from your dictionary?`

    return (
        <>
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
                        <IconButton
                            onClick={() => setOpenConfirmWordsForStudy(true)}
                        >
                            <AddBoxIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => setOpenConfirmDelete(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <ConfirmDialog
                title="Confirm"
                text={messageConfirmDelete}
                open={openConfirmDelete}
                setOpen={setOpenConfirmDelete}
                onConfirm={handleClickDeleteWords}
                onRefute={handleClearSelected}
            />
            <ConfirmDialog
                title="Confirm"
                text={messageConfirmForStudy}
                open={openConfirmWordsForStudy}
                setOpen={setOpenConfirmWordsForStudy}
                onConfirm={handleSubmitWordsForStudy}
                onRefute={handleClearSelected}
            />
        </>
    )
}

export default ToolbarWordsCards
