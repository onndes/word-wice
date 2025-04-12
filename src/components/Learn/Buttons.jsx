import { Box } from '@mui/material'
import React from 'react'
import LockIcon from '@mui/icons-material/Lock'
import useMyTheme from '../../hooks/useMyTheme'
import MyButton from '../MyButton'

const Buttons = ({
    handleDonNotKnow,
    handleRemembered,
    isEaseMode,
    isCorrectAnswer,
    isDisabledInput,
}) => {
    const { t, mq } = useMyTheme()
    return (
        <Box
            display="grid"
            pb={4}
            pt={5}
            gap={1.5}
            gridTemplateColumns="1fr 1fr"
            justifyContent="center"
        >
            <MyButton
                onClick={handleDonNotKnow}
                bgc="#ffcdd2"
                bgch={mq ? '#ffcdd2' : '#ef9a9a'}
                c="#ef5350"
                sx={{
                    fontSize: '15px',
                    textTransform: 'initial',
                    width: '100%',
                    height: '50px',
                    fontWeight: '600',
                }}
            >
                {t(`Don't know`)}
            </MyButton>
            <MyButton
                onClick={handleRemembered}
                disabled={!isEaseMode && !isCorrectAnswer && !isEaseMode}
                bgc="#c8e6c9"
                bgch={mq ? '#c8e6c9' : '#a5d6a7'}
                c="#43a047"
                sx={{
                    fontSize: '15px',
                    textTransform: 'initial',
                    height: '50px',
                    fontWeight: '600',
                }}
            >
                {t('Remembered')}
                {isEaseMode
                    ? ''
                    : isDisabledInput && <LockIcon fontSize="small" />}
            </MyButton>
        </Box>
    )
}

export default Buttons
