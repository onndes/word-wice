import { styled } from '@mui/material/styles'
import { Switch, Typography, Box } from '@mui/material'
import useMyTheme from '../../../hooks/useMyTheme'

const ModeSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#f39c12', // ярко-жёлтый
                opacity: 1,
                border: '1px solid #e67e22',
            },
        },
    },
}))

export default function StudyModeToggle({ isEasyMode, onToggle }) {
    const { t } = useMyTheme()
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            mb={2}
            flexDirection="row"
            gap={1}
            // wrap="wrap"
        >
            <Typography
                variant="subtitle2"
                color={isEasyMode ? 'warning.main' : 'success.main'}
            >
                {isEasyMode ? t('Easy Mode') : t('Normal Mode')}
            </Typography>
            <ModeSwitch checked={isEasyMode} onChange={onToggle} />
        </Box>
    )
}
