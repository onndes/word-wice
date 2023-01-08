import { createSlice } from '@reduxjs/toolkit'

import { isLoading } from '../../../utils/consts'
import { addIsLoading, removeIsLoading } from '../../../utils/updateLoading'
import { addWords, deleteWords, fetchWords } from './wordsAsync'

const initialState = {
    words: [],
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
        builder.addCase(fetchWords.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.FETCH_WORDS, state)
        })
        builder.addCase(fetchWords.fulfilled, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.FETCH_WORDS, state)
            if (Array.isArray(action.payload)) state.words = [...action.payload]
        })
        builder.addCase(fetchWords.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.FETCH_WORDS, state)
            state.error = action.payload
        })

        builder.addCase(addWords.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.ADD_WORDS, state)
        })
        builder.addCase(addWords.fulfilled, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.ADD_WORDS, state)
            state.words = [action.payload, ...state.words]
        })
        builder.addCase(addWords.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.ADD_WORDS, state)
            state.error = action.payload
        })

        builder.addCase(deleteWords.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.DELETE_WORDS, state)
        })
        builder.addCase(deleteWords.fulfilled, (state, { payload }) => {
            state.isLoading = removeIsLoading(isLoading.DELETE_WORDS, state)
            state.words = state.words.filter(({ id }) => id !== payload.id)
        })
        builder.addCase(deleteWords.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.DELETE_WORDS, state)
            state.error = action.payload
        })
    },
})

export const { resetStateWords } = wordsSlice.actions

export default wordsSlice.reducer
