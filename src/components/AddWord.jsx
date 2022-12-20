import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'

import { schemaFormAddWord } from '../utils/schemaFormAddWord'
import MyInput from './MyInput'

const AddWord = () => {
    const [formData, setFormData] = useState(null)
    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(schemaFormAddWord),
    })

    const onSubmit = (data) => {
        setFormData(data)
        reset()
    }

    useEffect(() => {}, [formData])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    m: 1,
                    width: '25ch',
                },
                display: 'flex',
                alignItems: 'top'
            }}
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
            <MyInput control={control} label="Word" name="word" />
            <MyInput control={control} label="Transcript" name="transcript" />
            <MyInput control={control} label="Translation" name="translation" />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    height: '50px',
                    width: '100px',
                    fontSize: 20,

                    mt: '10px',
                }}
            >
                ADD
            </Button>
        </Box>
    )
}

export default AddWord
