import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMyTheme from '../../../../hooks/useMyTheme'
import { setFilter } from '../../../../redux/slices/wordsSlice/wordsSlice'

const Filters = () => {
    const dispatch = useDispatch()
    const { t } = useMyTheme()
    const filter = useSelector(({ words }) => words.filter)

    const handleChange = (filterName) => {
        dispatch(setFilter({ filterName, filterData: !filter[filterName] }))
    }

    return (
        <>
            <FormControlLabel
                label={t('New words')}
                control={
                    <Checkbox
                        checked={filter.newWords}
                        onChange={() => handleChange('newWords')}
                    />
                }
            />
            <FormControlLabel
                label={t('In the study')}
                control={
                    <Checkbox
                        checked={filter.inProcessWords}
                        onChange={() => handleChange('inProcessWords')}
                    />
                }
            />
            <FormControlLabel
                label={t('Learned')}
                control={
                    <Checkbox
                        checked={filter.learnedWords}
                        onChange={() => handleChange('learnedWords')}
                    />
                }
            />
        </>
    )
}

export default Filters
