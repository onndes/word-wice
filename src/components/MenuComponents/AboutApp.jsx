import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ABOUT_APP_ROUTE } from '../../common/consts/ROUTES'
import useMyTheme from '../../hooks/useMyTheme'

const AboutApp = () => {
    const { t } = useMyTheme()
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                alignItems: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>{t('About the app')}</Box>
                <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to={ABOUT_APP_ROUTE}
                >
                    {t('See')}
                </Button>
            </Box>
        </Box>
    )
}

export default AboutApp
