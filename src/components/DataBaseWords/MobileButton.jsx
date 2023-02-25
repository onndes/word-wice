import React from 'react'
import { Box, Button, IconButton } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { Link } from 'react-router-dom'
import { ADD_WORD_ROUTE, BASE_WORDS_ROUTE } from '../../utils/consts'
import useMyTheme from '../../hooks/useMyTheme'

const MobileButton = () => {
    const { theme, t, colors } = useMyTheme()

    return (
        <Box
            sx={{
                display: 'block',
                zIndex: 1000,
                position: 'fixed',
                bottom: '90px',
                right: '16px',
            }}
        >
            <Button
                component={Link}
                to={BASE_WORDS_ROUTE}
                variant="contained"
                size="large"
                sx={{
                    background: colors.orange[600],
                    display: 'flex',
                    fontWeight: 600,
                    borderRadius: '50%',
                    boxShadow: `0px 0px 10px 2px ${colors.orange[500]}`,
                    backdropFilter: 'blur(4px)',
                    height: '46px',
                    width: '46px',
                    minWidth: '0px',
                }}
            >
                <Box sx={{ display: 'flex', pl: '2px', pb: '2px' }}>
                    <PostAddIcon fontSize="large" />
                </Box>
            </Button>
        </Box>
    )
}

export default MobileButton
