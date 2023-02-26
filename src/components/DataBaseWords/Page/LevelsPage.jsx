import { Container } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import { LEVEL_BASE_WORDS_ROUTE } from '../../../common/consts/ROUTES'
import useMyTheme from '../../../hooks/useMyTheme'
import ButtonDataBase from '../ButtonDataBase'

const LevelsPage = () => {
    const { colors } = useMyTheme()

    return (
        <Container maxWidth="sm" disableGutters>
            <Grid2 container spacing={1.5}>
                <Grid2 xs={6}>
                    <ButtonDataBase
                        to={`${LEVEL_BASE_WORDS_ROUTE}/A1`}
                        text="A1"
                        bgc={colors.mocha[500]}
                        bgch={colors.mocha[600]}
                    />
                </Grid2>
                <Grid2 xs={6}>
                    <ButtonDataBase
                        to={`${LEVEL_BASE_WORDS_ROUTE}/A2`}
                        text="A2"
                        bgc={colors.mocha[500]}
                        bgch={colors.mocha[600]}
                    />
                </Grid2>
                <Grid2 xs={6}>
                    <ButtonDataBase
                        to={`${LEVEL_BASE_WORDS_ROUTE}/B1`}
                        text="B1"
                        bgc={colors.emerald[500]}
                        bgch={colors.emerald[600]}
                    />
                </Grid2>
                <Grid2 xs={6}>
                    <ButtonDataBase
                        to={`${LEVEL_BASE_WORDS_ROUTE}/B2`}
                        text="B2"
                        bgc={colors.emerald[500]}
                        bgch={colors.emerald[600]}
                    />
                </Grid2>
                <Grid2 xs={6}>
                    <ButtonDataBase
                        to={`${LEVEL_BASE_WORDS_ROUTE}/C1`}
                        text="C1"
                        bgc={colors.indigo[500]}
                        bgch={colors.indigo[600]}
                    />
                </Grid2>
            </Grid2>
        </Container>
    )
}

export default LevelsPage
