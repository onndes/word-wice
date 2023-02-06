import { createSlice } from '@reduxjs/toolkit'
import { setStatus } from '../../../utils/handleStatus'
import { selectStatus } from '../../selectors/selectors'

import {
    addWords,
    deleteWords,
    submitWordsForStudy,
    updateKnowledgeInProcess,
    submitWordsForLearned,
} from './wordsAsync'

const initialState = {
    newWords: [],
    inProcessWords: [],
    learnedWords: [],
    mixedWords: [],
    status: [],
    currentWordIdx: 0,
    isStarted: false,
    checkWords: false,
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
            state[payload.nameCollection] = payload.words
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
        handleStatus(state, { payload }) {
            const data = {
                name: payload.nameCollection,
                status: payload.status,
                error: payload?.error || null,
            }
            const idxStatus = state.status.findIndex(
                (s) => s.name === payload.nameCollection
            )
            if (state.status.length === 0) {
                state.status = [data]
            } else if (idxStatus === -1) {
                state.status = [...state.status, data]
            } else {
                state.status = state.status.map((s) => {
                    if (s.name === payload.nameCollection) {
                        return data
                    }
                    return s
                })
            }
        },
    },
    extraReducers: (builder) => {
        // addWords
        builder.addCase(addWords.pending, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(addWords.fulfilled, (state, action) => {
            setStatus(state, action)
            state[action.payload.collectionName] = [
                action.payload.word,
                ...state[action.payload.collectionName],
            ]
        })
        builder.addCase(addWords.rejected, (state, action) => {
            setStatus(state, action)
        })

        // deleteWords
        builder.addCase(deleteWords.pending, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(deleteWords.fulfilled, (state, action) => {
            setStatus(state, action)
            state[action.payload.collectionName] = state[
                action.payload.collectionName
            ].filter(({ id }) => id !== action.payload.word.id)
        })
        builder.addCase(deleteWords.rejected, (state, action) => {
            setStatus(state, action)
        })

        // submitWordsForStudy
        builder.addCase(submitWordsForStudy.pending, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(submitWordsForStudy.fulfilled, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(submitWordsForStudy.rejected, (state, action) => {
            setStatus(state, action)
        })
        // submitWordsForLearned
        builder.addCase(submitWordsForLearned.pending, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(submitWordsForLearned.fulfilled, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(submitWordsForLearned.rejected, (state, action) => {
            setStatus(state, action)
        })
        // updateKnowledgeInProcess
        builder.addCase(updateKnowledgeInProcess.pending, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(updateKnowledgeInProcess.fulfilled, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(updateKnowledgeInProcess.rejected, (state, action) => {
            setStatus(state, action)
        })
    },
})

export const {
    resetStateWords,
    setMixedWords,
    setCurrentWordIdx,
    setProcessWords,
    setWords,
    setCheckWords,
    setStarted,
    handleStatus,
} = wordsSlice.actions

export default wordsSlice.reducer

export const selectStatusWords = (names) => (state) =>
    selectStatus(names, state.words)

export const selectAllWords = () => (state) => {
    return [
        ...state.words.newWords,
        ...state.words.inProcessWords,
        ...state.words.learnedWords,
    ]
}
