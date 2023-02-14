import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { Box } from '@mui/material'
import useMyTheme from '../../hooks/useMyTheme'

export default function MyInput({ label, name, control }) {
    const { colors, mq, t } = useMyTheme()

    return (
        <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Box sx={{ mr: mq ? 0 : 2, mb: 2 }}>
                    <TextField
                        variant="filled"
                        label={t(label)}
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoComplete="off"
                        fullWidth
                        sx={() => ({
                            '& .Mui-focused.MuiInputLabel-root': {
                                color: 'primary',
                                fontSize: 14,
                            },
                            '& .Mui-focused.MuiInputLabel-root.Mui-error': {
                                color: colors.redAccent[400],
                                fontSize: 14,
                            },
                        })}
                        {...field}
                    />
                </Box>
            )}
        />
    )
}
