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
    title,
    open,
    setOpen,
    onConfirm,
    onRefute,
    text = '',
}) {
    const { colors } = useMyTheme()
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
                PaperProps={{}}
                sx={{
                    '& 	.MuiDialog-paper': {
                        // minWidth: '250px',
                        background: colors.primary[400],
                    },
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleOnRefute}>
                        Disagree
                    </Button>
                    <Button color="success" onClick={handleOnConfirm}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
