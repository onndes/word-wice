import { Button } from '@mui/material'
import React from 'react'
import useMyTheme from '../hooks/useMyTheme'

const MyButton = ({
    children,
    onClick,
    disabled = false,
    sx,
    variant = 'contained',
    color = 'secondary',
    ...rest
}) => {
    const { mq } = useMyTheme()

    return (
        <Button
            disabled={disabled}
            variant={variant}
            color={color}
            onClick={onClick}
            sx={{
                '&:focus': mq && {
                    // eslint-disable-next-line max-len
                    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
                },
                ...sx,
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default MyButton
