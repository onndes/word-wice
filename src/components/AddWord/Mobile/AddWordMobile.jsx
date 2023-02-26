import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import useMyTheme from '../../../hooks/useMyTheme'
import { ADD_WORD_ROUTE } from '../../../common/consts/ROUTES'

const AddWordMobile = () => {
    const { theme, t } = useMyTheme()

    return (
        <Box
            sx={{
                display: 'block',
                zIndex: 1000,
                position: 'fixed',
                bottom: '90px',
                left: '50%',
                transform: 'translateX(-50%)',
            }}
        >
            <Button
                component={Link}
                to={ADD_WORD_ROUTE}
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                    fontWeight: 600,
                    borderRadius: '5px',
                    boxShadow: 
                      `0px 0px 10px 2px ${theme.palette.secondary.main}`,
                    backdropFilter: 'blur(4px)',
                }}
            >
                {t('Add Word')}
            </Button>
        </Box>
    )
}

export default AddWordMobile
