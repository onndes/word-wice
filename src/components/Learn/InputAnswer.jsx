import { Box, TextField, Typography } from '@mui/material'
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
                // color="text.secondary"
            >
                {title}
            </Typography>
            <Box>
                {/* <MyInput
                    control={control}
                    // label={isDisabledInput ? <LockIcon /> : ''}
                    name="answer"
                    variant="standard"
                    // disabled={isDisabledInput}
                /> */}
                <Controller
                    control={control}
                    defaultValue=""
                    name="answer"
                    render={({ field, fieldState: { error } }) => (
                        <Box>
                            <TextField
                                inputRef={inputAnswerRef}
                                variant="standard"
                                // label={t(label)}
                                error={!!error}
                                label={
                                    isDisabledInput && (
                                        <LockIcon fontSize="small" />
                                    )
                                }
                                helperText={error ? error.message : null}
                                autoComplete="off"
                                fullWidth
                                disabled={isDisabledInput}
                                sx={() => ({
                                    '& .Mui-focused.MuiInputLabel-root': {
                                        color: 'primary',
                                        fontSize: 14,
                                    },
                                    // eslint-disable-next-line max-len
                                    '& .Mui-focused.MuiInputLabel-root.Mui-error':
                                        {
                                            color: colors.redAccent[400],
                                            fontSize: 14,
                                        },
                                })}
                                {...field}
                            />
                        </Box>
                    )}
                />
                {/* <MyButton
                    onClick={handleClick}
                    bgc="#c8e6c9"
                    bgch={mq ? '#c8e6c9' : '#a5d6a7'}
                    c="#43a047"
                    sx={{
                        fontSize: '15px',
                        textTransform: 'initial',
                        // maxWidth: '160px',
                        height: '50px',
                        fontWeight: '600',
                    }}
                >
                    {t('Check')}
                </MyButton> */}
            </Box>
        </Box>
    )
}

export default InputAnswer
