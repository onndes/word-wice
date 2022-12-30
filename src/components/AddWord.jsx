import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { schemaFormAddWord } from '../utils/schemaFormAddWord'
import MyInput from './MyInput'
import { addWords } from '../redux/slices/wordsSlice/wordsAsync'

const AddWord = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(null)
    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(schemaFormAddWord),
    })

    const onSubmit = (data) => {
        setFormData(data)
        reset()
    }

    useEffect(() => {
        if (formData) {
            dispatch(addWords(formData))
        }
    }, [formData])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    m: 1,
                    width: '25ch',
                },
                display: 'flex',
                alignItems: 'top',
            }}
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
            <MyInput control={control} label="Word" name="word" />
            <MyInput control={control} label="Translation" name="translation" />
            <MyInput control={control} label="Transcript" name="transcript" />

            <Button
                color="secondary"
                variant="contained"
                type="submit"
                sx={{
                    height: '50px',
                    width: '100px',
                    fontSize: '18px',
                    mt: '10px',
                }}
            >
                ADD
            </Button>
        </Box>
    )
}

export default AddWord
