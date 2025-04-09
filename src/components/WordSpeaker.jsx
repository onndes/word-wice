import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

const WordSpeaker = ({ word }) => {
    const [isSupportVoice, setIsSupportVoice] = React.useState(false)

    useEffect(() => {
        // Проверка поддержки голосового синтеза
        if (window.responsiveVoice) {
            window.responsiveVoice.voiceSupport()
            setIsSupportVoice(true)
        } else {
            console.error('ResponsiveVoice не загружен')
        }
    }, [])

    const handleSpeak = () => {
        if (window.responsiveVoice) {
            window.responsiveVoice.speak(word, 'US English Male')
        } else {
            console.error('ResponsiveVoice не доступен')
        }
    }

    if (!isSupportVoice) {
        return null
    }

    return (
        <div>
            <IconButton
                disableRipple
                onClick={() => handleSpeak()}
                aria-label="play pronunciation"
                sx={{
                    '&:active': {
                        transform: 'scale(2)',
                        transition: 'transform 0.2s ease-in-out',
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                }}
            >
                <VolumeUpIcon />
            </IconButton>
        </div>
    )
}

export default WordSpeaker
