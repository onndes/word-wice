import { createSlice } from '@reduxjs/toolkit'

import { isLoading } from '../../../utils/consts'
import { addIsLoading, removeIsLoading } from '../../../utils/updateLoading'
import {
    addWords,
    fetchWords,
    deleteWords,
    submitWordsForStudy,
} from './wordsAsync'

const initialState = {
    newWords: [],
    inProcessWords: [],
    learnedWords: [],
    isLoading: [],
    error: null,
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        resetStateWords: () => initialState,
    },
    extraReducers: (builder) => {
        // fetchWords
        builder.addCase(fetchWords.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.FETCH_WORDS, state)
        })
        builder.addCase(fetchWords.fulfilled, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.FETCH_WORDS, state)
            const objKeys = Object.keys(action.payload)
            objKeys.forEach((key) => {
                state[key] = [...action.payload[key]]
            })
        })
        builder.addCase(fetchWords.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.FETCH_WORDS, state)
            state.error = action.payload
        })

        // addWords
        builder.addCase(addWords.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.ADD_WORDS, state)
        })
        builder.addCase(addWords.fulfilled, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.ADD_WORDS, state)
            state[action.payload.collectionName] = [
                action.payload.word,
                ...state[action.payload.collectionName],
            ]
        })
        builder.addCase(addWords.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.ADD_WORDS, state)
            state.error = action.payload
        })

        // deleteWords
        builder.addCase(deleteWords.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.DELETE_WORDS, state)
        })
        builder.addCase(deleteWords.fulfilled, (state, { payload }) => {
            state.isLoading = removeIsLoading(isLoading.DELETE_WORDS, state)
            state[payload.collectionName] = state[
                payload.collectionName
            ].filter(({ id }) => id !== payload.word.id)
        })
        builder.addCase(deleteWords.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.DELETE_WORDS, state)
            state.error = action.payload
        })

        // submitWordsForStudy
        builder.addCase(submitWordsForStudy.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.SUBMIT_STUDY, state)
        })
        builder.addCase(submitWordsForStudy.fulfilled, (state) => {
            state.isLoading = removeIsLoading(isLoading.SUBMIT_STUDY, state)
        })
        builder.addCase(submitWordsForStudy.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.SUBMIT_STUDY, state)
            state.error = action.payload
        })
    },
})

export const selectLoading = (loading) => (state) =>
    state.words.isLoading.some((l) => l === loading)

export const { resetStateWords } = wordsSlice.actions

export default wordsSlice.reducer
