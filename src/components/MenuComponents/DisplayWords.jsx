import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMyTheme from '../../hooks/useMyTheme'
import {
    setOrder,
    setOrderBy,
} from '../../redux/slices/settingsAppSlice/settingsAppSlice'
import { headCells } from '../TableWords/Head'

const DisplayWords = () => {
    const dispatch = useDispatch()
    const { colors } = useMyTheme()
    const { orderBy, order } = useSelector(
        ({ settingsApp }) => settingsApp.wordsList
    )

    const handleChange = (event) => {
        dispatch(setOrderBy(event.target.value))
    }
    const handleChangeOrder = (event) => {
        dispatch(setOrder(event.target.value))
    }

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
                            value={orderBy}
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
                            {headCells.map((el) => {
                                return (
                                    <MenuItem key={el.id} value={el.id}>
                                        {el.label}
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
                <Box>Order</Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small" variant="standard">
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            onChange={handleChangeOrder}
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
                            <MenuItem value="asc">asc</MenuItem>
                            <MenuItem value="desc">desk</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default DisplayWords
