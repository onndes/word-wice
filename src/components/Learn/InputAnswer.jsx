import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import LockIcon from '@mui/icons-material/Lock'
import { Controller } from 'react-hook-form'
import useMyTheme from '../../hooks/useMyTheme'

const InputAnswer = ({ control, title, isDisabledInput, inputAnswerRef }) => {
    const { colors } = useMyTheme()
    const { isEaseMode } = useSelector(({ settingsApp }) => settingsApp.user)

    if (isEaseMode) return null

    return (
        <Box mt={2} mb={2} ml={1}>
            <Typography
                mb={1}
                variant="h6"
                color={isDisabledInput ? 'text.secondary' : 'text.success'}
            >
                {title}
            </Typography>
            <Box>
                <Controller
                    control={control}
                    defaultValue=""
                    name="answer"
                    render={({ field, fieldState: { error } }) => (
                        <Box>
                            <TextField
                                inputRef={inputAnswerRef}
                                variant="standard"
                                error={!!error}
                                helperText={error ? error.message : null}
                                autoComplete="off"
                                fullWidth
                                disabled={isDisabledInput}
                                InputProps={{
                                    startAdornment: isDisabledInput ? (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                opacity: isDisabledInput
                                                    ? 1
                                                    : 0,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        >
                                            <Box>
                                                <LockIcon
                                                    fontSize="small"
                                                    sx={{
                                                        color: 'text.disabled',
                                                    }}
                                                />
                                            </Box>
                                        </InputAdornment>
                                    ) : null,
                                }}
                                sx={() => ({
                                    '& .MuiInputBase-root': {
                                        fontSize: 16,
                                    },
                                    '& .Mui-focused.MuiInputLabel-root': {
                                        color: 'primary',
                                        fontSize: 16,
                                    },
                                    // eslint-disable-next-line max-len
                                    '& .Mui-focused.MuiInputLabel-root.Mui-error':
                                        {
                                            color: colors.redAccent[400],
                                            fontSize: 16,
                                        },
                                })}
                                {...field}
                            />
                        </Box>
                    )}
                />
            </Box>
        </Box>
    )
}

export default InputAnswer
