import { Box } from '@mui/material'
import React from 'react'
import useMyTheme from '../../hooks/useMyTheme'
import MyButton from '../MyButton'

const Buttons = ({ handleDonNotKnow, handleRemembered }) => {
    const { t } = useMyTheme()

    return (
        <Box
            display="grid"
            justifyContent="space-between"
            pb={4}
            gap={1.5}
            gridTemplateColumns="4fr 5fr"
        >
            <MyButton
                onClick={handleDonNotKnow}
                bgc="#ffcdd2"
                bgch="#ffcdd2"
                c="#ef5350"
                sx={{
                    fontSize: '15px',
                    textTransform: 'initial',
                    maxWidth: '160px',
                    height: '50px',
                    fontWeight: '600',
                }}
            >
                {t(`Don't know`)}
            </MyButton>
            <MyButton
                onClick={handleRemembered}
                bgc="#c8e6c9"
                bgch="#c8e6c9"
                c="#43a047"
                sx={{
                    fontSize: '15px',
                    textTransform: 'initial',
                    maxWidth: '160px',
                    height: '50px',
                    fontWeight: '600',
                }}
            >
                {t('Remembered')}
            </MyButton>
        </Box>
    )
}

export default Buttons
