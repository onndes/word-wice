import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    arrayRemove,
    arrayUnion,
    doc,
    updateDoc,
} from 'firebase/firestore'
import translate from 'translate'
import { db } from '../../../firebase'
import { collectionNameWords, knowWord } from '../../../utils/consts'

export const addWords = createAsyncThunk(
    'words/addWords',
    async (wordData, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, wordData.collectionName, getState().user.id)
            updateDoc(docRef, {
                words: arrayUnion(wordData.word),
            })
            return wordData
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const deleteWords = createAsyncThunk(
    'words/deleteWords',
    async (wordData, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, wordData.collectionName, getState().user.id)
            updateDoc(docRef, {
                words: arrayRemove(wordData.word),
            })
            return wordData
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const submitWordsForStudy = createAsyncThunk(
    'words/submitWordsForStudy',
    async (word, { thunkAPI, dispatch }) => {
        try {
            await dispatch(
                deleteWords({ collectionName: collectionNameWords.NEW, word })
            )
            await dispatch(
                addWords({
                    collectionName: collectionNameWords.IN_PROCESS,
                    word: { ...word, knowledge: knowWord.A1.code },
                })
            )
            return word
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const updateKnowledgeInProcess = createAsyncThunk(
    'words/updateKnowledgeInProcess',
    async (data, { thunkAPI, dispatch }) => {
        try {
            if (data.word.knowledge !== data.knowledge) {
                await dispatch(
                    deleteWords({
                        collectionName: collectionNameWords.IN_PROCESS,
                        word: data.word,
                    })
                )
                await dispatch(
                    addWords({
                        collectionName: collectionNameWords.IN_PROCESS,
                        word: { ...data.word, knowledge: data.knowledge },
                    })
                )
            }
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const submitWordsForLearned = createAsyncThunk(
    'words/submitWordsForLearned',
    async (data, { thunkAPI, dispatch }) => {
        try {
            await dispatch(
                deleteWords({
                    collectionName: collectionNameWords.IN_PROCESS,
                    word: data.word,
                })
            )
            await dispatch(
                addWords({
                    collectionName: collectionNameWords.LEARNED,
                    word: { ...data.word, knowledge: data.knowledge },
                })
            )
            if (data.isLast) {
                // dispatch(fetchWords([collectionNameWords.IN_PROCESS]))
            }
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const translateWord = async (word, from, to) => {
    const text = await translate(word, { from, to, engine: 'google' })
    return text
}
