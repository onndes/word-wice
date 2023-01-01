import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { Box } from '@mui/material'

export default function MyInput({ label, name, control }) {
    return (
        <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Box sx={{ minHeight: '100px' }}>
                    <TextField
                        variant="filled"
                        label={label}
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoComplete='off'
                        {...field}
                    />
                </Box>
            )}
        />
    )
}
