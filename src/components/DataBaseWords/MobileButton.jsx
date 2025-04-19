// MobileButtonNeo.tsx
import React from 'react'
import { Box, Button } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { Link } from 'react-router-dom'
import useMyTheme from '../../hooks/useMyTheme'
import { BASE_WORDS_ROUTE } from '../../common/consts/ROUTES'

const MobileButtonNeo = () => {
    const { colors } = useMyTheme()

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 120,
                right: 16,
                zIndex: 1200,
            }}
        >
            <Button
                component={Link}
                to={BASE_WORDS_ROUTE}
                sx={{
                    width: 56,
                    height: 56,
                    minWidth: 0,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: `
                        6px 6px 12px rgba(0, 0, 0, 0.4),
                        -6px -6px 12px rgba(255, 255, 255, 0.05)
                    `,
                    color: '#fff',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: `
                            0 0 18px ${colors.orange[400]},
                            0 0 4px ${colors.orange[200]}
                        `,
                        transform: 'scale(1.1)',
                    },
                }}
            >
                <PostAddIcon fontSize="medium" />
            </Button>
        </Box>
    )
}

export default MobileButtonNeo
