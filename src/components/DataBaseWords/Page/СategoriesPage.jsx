import { Container } from '@mui/material'
import React from 'react'
import {
    LEVEL_V1_WORDS_ROUTE,
    LEVEL_V2_WORDS_ROUTE,
    TOP1000_BASE_WORDS_ROUTE,
} from '../../../common/consts/ROUTES'
import useMyTheme from '../../../hooks/useMyTheme'
import ButtonDataBase from '../ButtonDataBase'

const СategoriesPage = () => {
    const { colors, t } = useMyTheme()

    return (
        <Container maxWidth="sm" disableGutters>
            {/* <ButtonDataBase
                to={LEVEL_V2_WORDS_ROUTE}
                text={t('By level of English V2')}
                bgc={colors.greenAccent[600]}
                bgch={colors.greenAccent[700]}
                mb
            /> */}
            <ButtonDataBase
                to={LEVEL_V1_WORDS_ROUTE}
                text={t('By level of English (old)')}
                bgc={colors.orange[600]}
                bgch={colors.orange[700]}
                mb
            />

            <ButtonDataBase
                disabled
                to={TOP1000_BASE_WORDS_ROUTE}
                text={t('Top 1000 words')}
                bgc={colors.orange[600]}
                bgch={colors.orange[700]}
                mb
            />
        </Container>
    )
}

export default СategoriesPage
