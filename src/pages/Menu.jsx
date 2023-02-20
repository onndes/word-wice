import React from 'react'
import { Typography, Paper, Container, styled } from '@mui/material'
import ButtonToggleTheme from '../components/MenuComponents/ButtonToggleTheme'
import LogOut from '../components/LogOut'
import useMyTheme from '../hooks/useMyTheme'
import RecommendForLearn from '../components/MenuComponents/RecommendForLearn'
import DeleteDuplicate from '../components/MenuComponents/DeleteDuplicate'
import LanguageSwitcher from '../components/MenuComponents/LanguageSwitcher'

const Title = styled(Typography)(({ theme }) => ({
    marginLeft: theme.spacing(1.5),
    color: theme.palette.text.secondary,
}))

const Block = styled(Paper, { shouldForwardProp: () => ({ elevation: 24 }) })(
    ({ theme }) => ({
        padding: theme.spacing(1.5),
        width: '100%',
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.primary,
    })
)

const Menu = () => {
    const { t } = useMyTheme()

    return (
        <Container
            disableGutters
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: '100%',
                gap: 1,
            }}
        >
            <Title variant="h5">{t('Application')}</Title>
            <Block elevation={1}>
                <ButtonToggleTheme />
                <LanguageSwitcher />
            </Block>
            <Title variant="h5">{t('Learn')}</Title>
            <Block elevation={1}>
                <RecommendForLearn />
            </Block>
            <Title variant="h5">{t('Synchronization')}</Title>
            <Block elevation={1}>
                <DeleteDuplicate />
            </Block>
            <Title variant="h5">{t('Account')}</Title>
            <Block elevation={1}>
                <LogOut />
            </Block>
        </Container>
    )
}

export default Menu
