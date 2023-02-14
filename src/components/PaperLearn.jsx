import { Paper, styled } from '@mui/material'
import useMyTheme from '../hooks/useMyTheme'

export const PaperLearn = styled(Paper)(() => {
    const { mq } = useMyTheme()

    return {
        padding: '20px',
        width: '100%',
        mb: 2,
        maxWidth: '400px',
        margin: '0 auto ',
        height: mq ? '100%' : '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: mq ? 'space-between' : 'center',
    }
})
