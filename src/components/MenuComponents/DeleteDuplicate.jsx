import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../redux/slices/settingsAppSlice/settingsAppAsync'

const DeleteDuplicate = () => {
    const dispatch = useDispatch()
    const { variantDelDuplicate } = useSelector(
        ({ settingsApp }) => settingsApp.user
    )
    const handleChange = (event) => {
        dispatch(
            setSettings({
                name: 'variantDelDuplicate',
                value: event.target.value,
            })
        )
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
                <Box>Save word: </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small" variant="standard">
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={variantDelDuplicate}
                            onChange={handleChange}
                            sx={{
                                minWidth: '134px',
                            }}
                        >
                            <MenuItem value="lastUpdateWords">
                                Last changes
                            </MenuItem>
                            <MenuItem value="higherKnowledge">
                                Higher knowledge
                            </MenuItem>
                            <MenuItem value="lowerKnowledge">
                                Lower knowledge
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default DeleteDuplicate
