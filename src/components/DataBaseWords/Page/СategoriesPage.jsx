import { Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useMyTheme from '../../../hooks/useMyTheme'
import { LEVEL_BASE_WORDS_ROUTE } from '../../../utils/consts'
import MyButton from '../../MyButton'
import ButtonDataBase from '../ButtonDataBase'

const СategoriesPage = () => {
    const { colors } = useMyTheme()

    return (
        <Container maxWidth="sm">
            <ButtonDataBase
                to={LEVEL_BASE_WORDS_ROUTE}
                text="By level of English"
                bgc={colors.orange[600]}
                bgch={colors.orange[700]}
                mb
            />
        </Container>
    )
}

export default СategoriesPage
