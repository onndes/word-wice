import { useMediaQuery, useTheme } from '@mui/material'
import { tokens } from '../theme/theme'

const useMyTheme = (width = '900') => {
    const mq = useMediaQuery(`(max-width:${width}px)`)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return { mq, theme, colors }
}

export default useMyTheme
