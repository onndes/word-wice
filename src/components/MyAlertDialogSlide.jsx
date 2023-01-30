import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import useMyTheme from '../hooks/useMyTheme'

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
))

export default function MyAlertDialogSlide({
    open,
    setOpen,
    setConfirm,
    hideConfirm,
    setHideConfirm,
}) {
    const { colors } = useMyTheme()

    const handleCloseCancellation = () => {
        setOpen(false)
    }
    const handleCloseTranslate = () => {
        setOpen(false)
        setConfirm(true)
    }

    return (
        <Box>
            <Dialog
                PaperProps={{
                    sx: {
                        width: '100%',
                        mb: 2,
                        background: colors.primary[400],
                    },
                }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseCancellation}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Translator</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        color="red"
                    >
                        This translation may not be accurate
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <FormControlLabel
                        label="No longer show?"
                        sx={{ ml: 0.5 }}
                        control={
                            <Checkbox
                                value=""
                                checked={hideConfirm}
                                onChange={() => setHideConfirm(!hideConfirm)}
                                color="secondary"
                            />
                        }
                    />
                    <Box>
                        <Button
                            color="secondary"
                            onClick={handleCloseCancellation}
                        >
                            Cancellation
                        </Button>
                        <Button
                            color="secondary"
                            onClick={handleCloseTranslate}
                        >
                            Translate
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
