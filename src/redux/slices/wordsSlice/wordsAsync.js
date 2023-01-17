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
import { collectionNameWords, knowWord } from '../../../utils/consts'

export const fetchWords = createAsyncThunk(
    'words/fetchWords',
    async (fetchCollections, { thunkAPI, getState }) => {
        try {
            const collectionsWords =
                fetchCollections || Object.values(collectionNameWords)
            const docsRef = collectionsWords.map((el) =>
                doc(db, el, getState().user.id)
            )
            const promise = docsRef.map((el) => getDoc(el))
            const res = await Promise.all(promise)
            const allWords = {}
            res.forEach((el) => {
                allWords[el.data().nameCollection] = el.data().words
                    ? el.data().words
                    : []
            })

            return allWords
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const addWords = createAsyncThunk(
    'words/addWords',
    async (wordData, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, wordData.collectionName, getState().user.id)
            await updateDoc(docRef, {
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
            await updateDoc(docRef, {
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

export const translateWord = async (word, from, to) => {
    const text = await translate(word, { from, to, engine: 'google' })
    return text
}
