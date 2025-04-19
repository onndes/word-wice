// AddWordMobileGlass.tsx
import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import useMyTheme from '../../../hooks/useMyTheme'
import { ADD_WORD_ROUTE } from '../../../common/consts/ROUTES'

const AddWordMobileGlass = () => {
    const { theme, t } = useMyTheme()

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 120,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1200,
            }}
        >
            <Button
                component={Link}
                to={ADD_WORD_ROUTE}
                size="large"
                sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.secondary.main}50`,
                    boxShadow: `0 0 14px 2px ${theme.palette.secondary.main}40`,
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                        background: theme.palette.secondary.main,
                        boxShadow: `0 0 20px 4px ${theme.palette.secondary.main}80`,
                        transform: 'scale(1.05)',
                    },
                }}
            >
                {t('Add Word')}
            </Button>
        </Box>
    )
}

export default AddWordMobileGlass
