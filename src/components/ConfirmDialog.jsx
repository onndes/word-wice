import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { Paper } from '@mui/material'
import useMyTheme from '../hooks/useMyTheme'

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function ConfirmDialog({
    open,
    setOpen,
    onConfirm,
    onRefute,
    title = 'Confirm',
    text = '',
}) {
    const { t } = useMyTheme()

    const handleOnConfirm = () => {
        setOpen(false)
        onConfirm()
    }
    const handleOnRefute = () => {
        setOpen(false)
        onRefute()
    }
    return (
        <Paper>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
                sx={(theme) => ({
                    '& 	.MuiDialog-paper': {
                        background: theme.palette.background.main,
                    },
                })}
            >
                <DialogTitle color="text.primary" sx={{ fontSize: '20px' }}>
                    {t(title)}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        color="text.primary"
                        id="alert-dialog-slide-description"
                    >
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleOnRefute}>
                        {t('Disagree')}
                    </Button>
                    <Button color="success" onClick={handleOnConfirm}>
                        {t('Agree')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
