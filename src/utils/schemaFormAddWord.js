import * as yup from 'yup'

export const schemaFormAddWord = yup
    .object({
        word: yup
            .string()
            .required('Be sure to fill out')
            .min(1, 'min 1 characters'),
        transcript: yup.string(),
        translation: yup
            .string()
            .required('Be sure to fill out')
            .min(1, '1 characters'),
    })
    .required()
