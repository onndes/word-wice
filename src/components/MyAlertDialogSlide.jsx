import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import MyButton from './MyButton'
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
    const { t } = useMyTheme()

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
                sx={(theme) => ({
                    '& 	.MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '400px',
                        mb: 2,
                        background: theme.palette.background.main,
                        margin: 1,
                    },
                })}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseCancellation}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle fontSize="19px">{t("Translator")}</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        fontSize="17  px"
                        id="alert-dialog-slide-description"
                        color='text.primary'
                    >
                        {t("This translation may not be accurate")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <FormControlLabel
                        label={t("No longer show?")}
                        sx={{ ml: 0.5 }}
                        control={
                            <Checkbox
                                value=""
                                checked={hideConfirm}
                                onChange={() => setHideConfirm(!hideConfirm)}
                                color="primary"
                            />
                        }
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <MyButton
                            color="primary"
                            variant="outlined"
                            onClick={handleCloseCancellation}
                        >
                            {t("Cancellation")}
                        </MyButton>
                        <MyButton
                            variant="outlined"
                            color="primary"
                            onClick={handleCloseTranslate}
                        >
                            {t("Translate")}
                        </MyButton>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
