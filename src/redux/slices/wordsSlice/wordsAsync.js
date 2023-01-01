import { createAsyncThunk } from '@reduxjs/toolkit'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import translate from 'translate'
import { db } from '../../../firebase'

export const fetchWords = createAsyncThunk(
    'words/fetchWords',
    async (_, { getState }) => {
        try {
            const docRef = doc(db, 'users', getState().user.id)
            const docSnap = await getDoc(docRef)
            return docSnap.data().words
        } catch (e) {
            return e
        }
    }
)

export const addWords = createAsyncThunk(
    'words/addWords',
    async (words, { getState }) => {
        try {
            const docRef = doc(db, 'users', getState().user.id)
            await updateDoc(docRef, { words: arrayUnion(words) })
            return words
        } catch (e) {
            return e
        }
    }
)

export const translateWord = async (word, from, to) => {
    const text = await translate(word, { from, to, engine: 'google' })
    return text
}
