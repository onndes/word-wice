import { useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { tokens } from '../theme/theme'

const useMyTheme = (width = '900') => {
    const mq = useMediaQuery(`(max-width:${width}px)`)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const { t } = useTranslation()

    return { mq, theme, colors, t }
}

export default useMyTheme
