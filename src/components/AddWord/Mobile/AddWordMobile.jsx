import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { ADD_WORD_ROUTE } from '../../../utils/consts'
import useMyTheme from '../../../hooks/useMyTheme'

const AddWordMobile = () => {
    const { colors } = useMyTheme()

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
                    color: colors.grey[800],
                    fontWeight: 600,
                    borderRadius: '25px',
                    boxShadow: `0px 0px 20px 5px ${colors.greenAccent[800]}`,
                }}
            >
                Add Word
            </Button>
        </Box>
    )
}

export default AddWordMobile
