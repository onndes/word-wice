import * as React from 'react'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { Controller } from 'react-hook-form'

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.text.primary,
        },
    },
}))
export default function MyInput({ label, name, control }) {
    return (
        <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field, fieldState: { error } }) => (
                <CustomTextField
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : null}
                    {...field}
                />
            )}
        />
    )
}
