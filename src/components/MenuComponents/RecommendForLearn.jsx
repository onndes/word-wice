import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMyTheme from '../../hooks/useMyTheme'
import { setRecommendForLearn } from '../../redux/slices/settingsAppSlice/settingsAppAsync'

const RecommendForLearn = () => {
    const dispatch = useDispatch()
    const { colors } = useMyTheme()
    const { recommendForLearn } = useSelector(
        ({ settingsApp }) => settingsApp.user
    )
    const handleChange = (event) => {
        dispatch(setRecommendForLearn(event.target.value))
    }

    const numbers = Array.from({ length: 46 }, (_, i) => i + 5)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                alignItems: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>Sorting</Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small" variant="standard">
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={recommendForLearn}
                            onChange={handleChange}
                            sx={{
                                '& .Mui-focused.MuiSelectLabel-root': {
                                    color: colors.grey[400],
                                    fontSize: 14,
                                },
                                '& .Mui-focused.MuiSelectLabel-root.Mui-error':
                                    {
                                        color: 'red',
                                        fontSize: 14,
                                    },
                            }}
                        >
                            {numbers.map((el) => {
                                return (
                                    <MenuItem key={el} value={el}>
                                        {el}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default RecommendForLearn
