import { createSlice } from '@reduxjs/toolkit'

import { isLoading } from '../../../utils/consts'
import { addIsLoading, removeIsLoading } from '../../../utils/updateLoading'
import {
    addWords,
    fetchWords,
    deleteWords,
    submitWordsForStudy,
    updateKnowledgeInProcess,
    submitWordsForLearned,
} from './wordsAsync'

const status = {
    init: 'init',
    loading: 'loading',
    error: 'error',
    success: 'success',
}

const initialState = {
    mixedWords: [],
    currentWordIdx: 0,
    newWords: [],
    inProcessWords: [],
    isStarted: false,
    checkWords: false,
    learnedWords: [],
    isLoading: Object.keys(isLoading),
    error: {},
    loading: {
        updateKnowledgeInProcess: status.init,
    },
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        resetStateWords: () => initialState,
        setMixedWords(state, { payload }) {
            state.mixedWords = payload
        },
        setCurrentWordIdx(state, { payload }) {
            state.currentWordIdx = payload
        },
        setWords(state, { payload }) {
            state[payload.collectionName] = payload.words
        },
        setCheckWords(state, { payload }) {
            state.checkWords = payload
        },
        setProcessWords(state, { payload }) {
            state.inProcessWords = payload
        },
        setStarted(state, { payload }) {
            state.isStarted = payload
        },
    },
    extraReducers: (builder) => {
        // fetchWords
        builder.addCase(fetchWords.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.FETCH_WORDS, state)
            state.loading.updateKnowledgeInProcess = status.loading
        })
        builder.addCase(fetchWords.fulfilled, (state, action) => {
            state.loading.updateKnowledgeInProcess = status.success
            state.isLoading = removeIsLoading(isLoading.FETCH_WORDS, state)
            const objKeys = Object.keys(action.payload)
            objKeys.forEach((key) => {
                if (action.payload[key]) state[key] = action.payload[key]
            })
        })
        builder.addCase(fetchWords.rejected, (state, action) => {
            state.loading.updateKnowledgeInProcess = status.error
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
        // submitWordsForLearned
        builder.addCase(submitWordsForLearned.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.SUBMIT_LEARNED, state)
        })
        builder.addCase(submitWordsForLearned.fulfilled, (state) => {
            state.isLoading = removeIsLoading(isLoading.SUBMIT_LEARNED, state)
        })
        builder.addCase(submitWordsForLearned.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.SUBMIT_LEARNED, state)
            state.error = action.payload
        })
        // updateKnowledgeInProcess
        builder.addCase(updateKnowledgeInProcess.pending, (state) => {
            state.isLoading = addIsLoading(isLoading.UPDATE_KNOWLEDGE, state)
        })
        builder.addCase(updateKnowledgeInProcess.fulfilled, (state) => {
            state.isLoading = removeIsLoading(isLoading.UPDATE_KNOWLEDGE, state)
        })
        builder.addCase(updateKnowledgeInProcess.rejected, (state, action) => {
            state.isLoading = removeIsLoading(isLoading.UPDATE_KNOWLEDGE, state)
            state.error = action.payload
        })
    },
})

export const selectLoading = (loading) => (state) =>
    state.words.isLoading.some((l) => l === loading)

export const statusLoading = (request) => (state) => state.loading[request]

export const {
    resetStateWords,
    setMixedWords,
    setCurrentWordIdx,
    setProcessWords,
    setWords,
    setCheckWords,
    setStarted,
} = wordsSlice.actions

export default wordsSlice.reducer
