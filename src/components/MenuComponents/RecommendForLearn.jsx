import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../redux/slices/settingsAppSlice/settingsAppAsync'
import { fieldsData } from '../../utils/consts'

const RecommendForLearn = () => {
    const dispatch = useDispatch()
    const { recommendForLearn, show } = useSelector(
        ({ settingsApp }) => settingsApp.user
    )
    const handleChange = (event) => {
        dispatch(
            setSettings({
                name: 'recommendForLearn',
                value: event.target.value,
            })
        )
    }
    const handleChangeShow = (event) => {
        dispatch(
            setSettings({
                name: 'show',
                value: event.target.value,
            })
        )
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
                <Box>Recommended for study</Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small" variant="standard">
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={recommendForLearn}
                            onChange={handleChange}
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
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>Show</Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small" variant="standard">
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={show}
                            onChange={handleChangeShow}
                        >
                            <MenuItem value={fieldsData.translation.name}>
                                {fieldsData.translation.label}
                            </MenuItem>
                            <MenuItem value={fieldsData.word.name}>
                                {fieldsData.word.label}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default RecommendForLearn
