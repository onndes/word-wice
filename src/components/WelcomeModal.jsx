import * as React from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog'
import { Box, ButtonGroup, Typography } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import useMyTheme from '../hooks/useMyTheme'
import MyButton from './MyButton'

export const WelcomeModalItems = () => {
    const { t } = useMyTheme()
    const series = []
    for (let i = 1; i <= 10; i++) series.push(i)
    return series.map((num) => {
        if (num === 3) {
            return t(`appDesk#${num}`)
                .split('/')
                .map((el) => (
                    <Typography
                        key={el}
                        variant="subtitle1"
                        display="block"
                        fontSize="15px"
                        pl={4}
                    >
                        {el}
                    </Typography>
                ))
        }

        return (
            <Typography
                key={num}
                variant="subtitle1"
                mt={1}
                mb={1}
                display="block"
                align="justify"
                fontSize="15px"
            >
                {t(`appDesk#${num}`)}
            </Typography>
        )
    })
}

export default function WelcomeModal() {
    const check = window.localStorage.getItem('WelcomeModal')
    const [open, setOpen] = React.useState(!check)
    const { i18n, t } = useTranslation()

    const lang = i18n.language
    const handleChangeLanguage = (l) => {
        localStorage.setItem('languages', l)
        i18n.changeLanguage(l)
    }

    const handleClose = () => {
        setOpen(false)
        window.localStorage.setItem('WelcomeModal', 'true')
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={(theme) => ({
                '& 	.MuiDialog-paper': {
                    background: theme.palette.background.main,
                    margin: 1,
                },
            })}
        >
            <Box>
                <DialogContent sx={{ p: 1.5 }}>
                    <ButtonGroup
                        fullWidth
                        aria-label="outlined primary button group"
                        sx={{ mb: 2 }}
                    >
                        <MyButton
                            onClick={() => handleChangeLanguage('en')}
                            variant={lang === 'en' ? 'contained' : 'outlined'}
                        >
                            en
                        </MyButton>
                        <MyButton
                            onClick={() => handleChangeLanguage('ru')}
                            variant={lang === 'ru' ? 'contained' : 'outlined'}
                        >
                            ru
                        </MyButton>
                        <MyButton
                            onClick={() => handleChangeLanguage('ua')}
                            variant={lang === 'ua' ? 'contained' : 'outlined'}
                        >
                            ua
                        </MyButton>
                    </ButtonGroup>
                    <Typography variant="h2" textAlign="center">
                        {t('welcome_message')}
                    </Typography>
                    <WelcomeModalItems />
                    <MyButton
                        onClick={handleClose}
                        size="large"
                        fullWidth
                        sx={{
                            padding: '10px',
                            fontSize: '16px',
                            letterSpacing: '.2px',
                        }}
                    >
                        {t('Close')}
                    </MyButton>
                </DialogContent>
            </Box>
        </Dialog>
    )
}
