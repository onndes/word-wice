import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Trans } from 'react-i18next'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
// eslint-disable-next-line max-len
import { setSelected } from '../../../redux/slices/settingsAppSlice/settingsAppSlice'
import {
    deleteWords,
    inProcessWordDropToNow,
    submitWordsForStudy,
} from '../../../redux/slices/wordsSlice/wordsAsync'
import { collectionNameWords, knowWord } from '../../../utils/consts'
import ConfirmDialog from '../../ConfirmDialog'
import useMyTheme from '../../../hooks/useMyTheme'

const ToolbarWordsCards = () => {
    const dispatch = useDispatch()
    const { t } = useMyTheme()
    const { selected } = useSelector(({ settingsApp }) => settingsApp.wordsList)

    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [openConfirmWordsForStudy, setOpenConfirmWordsForStudy] =
        useState(false)
    const [openConfirmWordsForNew, setOpenConfirmWordsForNew] = useState(false)

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

    const handleWordDropToNow = () => {
        selected.forEach((el) => {
            if (el.knowledge === knowWord.A1.code) {
                dispatch(inProcessWordDropToNow({ word: el }))
            }
        })
        handleClearSelected()
    }

    const countToStudy = selected.filter(
        (el) => el.knowledge === knowWord.A0.code
    ).length
    const messageConfirmForStudy = (
        <Trans i18nKey="messageConfirm_study" count={countToStudy}>
            Are you certain that you wish to add these {{ countToStudy }}
            word(s) to your study list?
        </Trans>
    )

    const countSelected = selected.length
    const messageConfirmDelete = (
        <Trans i18nKey="messageConfirm_delete" count={countSelected}>
            Are you certain that you wish to remove these {{ countSelected }}
            word(s) from your dictionary?
        </Trans>
    )

    const countToNow = selected.filter(
        (el) => el.knowledge === knowWord.A1.code
    ).length
    const messageConfirmDropToNow = (
        <Trans i18nKey="messageConfirm_toNow" count={countToNow}>
            Are you sure you want to return these {{ countToNow }} word(s) to
            the list of new?
        </Trans>
    )

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
                    {selected.length} {t('selected')}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Tooltip title="Return to the new word">
                        <IconButton
                            onClick={() => setOpenConfirmWordsForNew(true)}
                        >
                            <IndeterminateCheckBoxIcon />
                        </IconButton>
                    </Tooltip>
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
                text={messageConfirmDelete}
                open={openConfirmDelete}
                setOpen={setOpenConfirmDelete}
                onConfirm={handleClickDeleteWords}
                onRefute={handleClearSelected}
            />
            <ConfirmDialog
                text={messageConfirmForStudy}
                open={openConfirmWordsForStudy}
                setOpen={setOpenConfirmWordsForStudy}
                onConfirm={handleSubmitWordsForStudy}
                onRefute={handleClearSelected}
            />
            <ConfirmDialog
                text={messageConfirmDropToNow}
                open={openConfirmWordsForNew}
                setOpen={setOpenConfirmWordsForNew}
                onConfirm={handleWordDropToNow}
                onRefute={handleClearSelected}
            />
        </>
    )
}

export default ToolbarWordsCards
