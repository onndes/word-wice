import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../theme/theme'

export default function MyInput({ label, name, control, mobile }) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Box sx={{ mr: mobile ? 0 : 2, mb: 2 }}>
                    <TextField
                        variant="filled"
                        label={label}
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoComplete="off"
                        fullWidth
                        sx={{
                            '& .Mui-focused.MuiInputLabel-root': {
                                color: colors.grey[400],
                                fontSize: 14,
                            },
                            '& .Mui-focused.MuiInputLabel-root.Mui-error': {
                                color: 'red',
                                fontSize: 14,
                            },
                        }}
                        {...field}
                    />
                </Box>
            )}
        />
    )
}
