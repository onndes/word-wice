import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation()

    const handleChange = (event) => {
        localStorage.setItem('languages', event.target.value)
        i18n.changeLanguage(event.target.value)
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
                <Box>{t('Language')}</Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small" variant="standard">
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={i18n.language}
                            onChange={handleChange}
                            sx={{ width: '100%' }}
                            onClose={() => {
                                setTimeout(() => {
                                    document.activeElement.blur()
                                }, 0)
                            }}
                        >
                            <MenuItem value="en">
                                <Box display="flex" alignItems="center">
                                    <Box mr="10px">EN</Box>
                                    <Box display="flex" alignItems="center">
                                        <img
                                            width="30px"
                                            src="https://img.icons8.com/color/48/null/great-britain.png"
                                            alt=""
                                        />
                                    </Box>
                                </Box>
                            </MenuItem>
                            <MenuItem value="ua" display="flex">
                                <Box display="flex" alignItems="center">
                                    <Box mr="10px">UA</Box>

                                    <img
                                        width="30px"
                                        src="https://img.icons8.com/color/48/null/ukraine.png"
                                        alt=""
                                    />
                                </Box>
                            </MenuItem>
                            <MenuItem value="ru">
                                <Box display="flex" alignItems="center">
                                    <Box>RU</Box>
                                    <Box width="30px" height="30px" />
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default LanguageSwitcher
