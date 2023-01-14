import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
import translate from 'translate'
import { db } from '../../../firebase'

export const fetchWords = createAsyncThunk(
    'words/fetchWords',
    async (_, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, 'newWords', getState().user.id)
            const docSnap = await getDoc(docRef)
            return docSnap.data().words
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const addWords = createAsyncThunk(
    'words/addWords',
    async (words, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, 'newWords', getState().user.id)
            await updateDoc(docRef, { words: arrayUnion(words) })
            return words
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const deleteWords = createAsyncThunk(
    'words/deleteWords',
    async (word, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, 'newWords', getState().user.id)
            await updateDoc(docRef, {
                words: arrayRemove(word),
            })
            return word
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const translateWord = async (word, from, to) => {
    const text = await translate(word, { from, to, engine: 'google' })
    return text
}
