import { Container } from '@mui/material'
import React from 'react'
import { LEVEL_BASE_WORDS_ROUTE } from '../../../common/consts/ROUTES'
import useMyTheme from '../../../hooks/useMyTheme'
import ButtonDataBase from '../ButtonDataBase'

const СategoriesPage = () => {
    const { colors, t } = useMyTheme()

    return (
        <Container maxWidth="sm">
            <ButtonDataBase
                to={LEVEL_BASE_WORDS_ROUTE}
                text={t('By level of English')}
                bgc={colors.orange[600]}
                bgch={colors.orange[700]}
                mb
            />
        </Container>
    )
}

export default СategoriesPage
