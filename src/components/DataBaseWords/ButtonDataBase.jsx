import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../MyButton'

const ButtonDataBase = ({ bgc, bgch, to, text, mb, ...otherProps }) => {
    return (
        <MyButton
            component={Link}
            to={to}
            size="large"
            bgc={bgc}
            bgch={bgch}
            sx={{
                textTransform: 'initial',
                mb: mb && 2,
                width: '100%',
                pt: '15px',
                pb: '15px',
                textAlign: 'center'
            }}
            {...otherProps}
        >
            <Typography variant="h4" color="white">
                {text}
            </Typography>
        </MyButton>
    )
}

export default ButtonDataBase
