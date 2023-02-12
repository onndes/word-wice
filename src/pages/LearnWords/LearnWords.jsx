import React from 'react'
import { Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { LEARN_NEW_ROUTE, LEARN_REPEAT_ROUTE } from '../../utils/consts'

const LearnWords = () => {
    return (
        <Container maxWidth="xs">
            <Button
                sx={(theme) => ({
                    display: 'block',
                    textAlign: 'center',
                    fontWeight: 600,
                    backgroundColor: theme.palette.button.default,
                    '&:hover': {
                        backgroundColor: theme.palette.button.hover,
                    },
                    mb: 2,
                    pt: 3,
                    pb: 3,
                })}
                component={Link}
                to={LEARN_NEW_ROUTE}
                variant="contained"
                color="primary"
                size="large"
            >
                Learn new words
            </Button>
            <Button
                sx={(theme) => ({
                    display: 'block',
                    backgroundColor: theme.palette.purple.default,
                    textAlign: 'center',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: theme.palette.purple.hover,
                    },
                    mb: 2,
                    pt: 3,
                    pb: 3,
                })}
                component={Link}
                to={LEARN_REPEAT_ROUTE}
                variant="contained"
                color="primary"
                size="large"
            >
                Repeat learned words
            </Button>
        </Container>
    )
}

export default LearnWords
