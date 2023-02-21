import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    arrayRemove,
    arrayUnion,
    doc,
    onSnapshot,
    query,
    Timestamp,
    updateDoc,
} from 'firebase/firestore'
import translate from 'translate'
import { db } from '../../../firebase'
import { collectionNameWords, knowWord } from '../../../utils/consts'
import { handleDelWords } from '../../../utils/handleDelWords'
import { handleDuplicateWords } from '../../../utils/handleDuplicateWords'
import { STATUS } from '../../../utils/handleStatus'

export const subWords = (
    dispatch,
    uid,
    handleStatus,
    setWords,
    variantDelDuplicate
) => {
    const inquiry = Object.values(collectionNameWords)
    const qsWords = inquiry.map((el) => query(doc(db, el, uid)))
    const unSubs = []

    qsWords.forEach((q, idx) => {
        dispatch(
            handleStatus({
                nameCollection: inquiry[idx],
                status: STATUS.loading,
            })
        )
        unSubs.push(
            onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
                const data = snapshot.data()

                const { uniq, duplicate } = handleDuplicateWords(
                    data.words || [],
                    variantDelDuplicate
                )

                if (duplicate.length) {
                    const { keys, words: wordsDel } = handleDelWords(duplicate)

                    keys.forEach((collection) => {
                        if (wordsDel[collection].length)
                            dispatch(
                                deleteWords({
                                    collectionName: collection,
                                    words: wordsDel[collection],
                                })
                            )
                    })
                } else {
                    dispatch(setWords({ ...data, words: uniq }))
                    dispatch(
                        handleStatus({
                            nameCollection: inquiry[idx],
                            status: STATUS.success,
                        })
                    )
                }
            })
        )
    })
    return unSubs
}

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
                words: arrayRemove(...wordData.words),
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
                deleteWords({
                    collectionName: collectionNameWords.NEW,
                    words: [word],
                })
            )

            await dispatch(
                addWords({
                    collectionName: collectionNameWords.IN_PROCESS,
                    word: {
                        ...word,
                        knowledge: knowWord.A1.code,
                        dateChange: Timestamp.fromDate(new Date()),
                    },
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
                        words: [data.word],
                    })
                )
                await dispatch(
                    addWords({
                        collectionName: collectionNameWords.IN_PROCESS,
                        word: {
                            ...data.word,
                            knowledge: data.knowledge,
                            dateChange: Timestamp.fromDate(new Date()),
                        },
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
                    words: [data.word],
                })
            )
            await dispatch(
                addWords({
                    collectionName: collectionNameWords.LEARNED,
                    word: {
                        ...data.word,
                        knowledge: data.knowledge,
                        dateChange: Timestamp.fromDate(new Date()),
                        dateLearned: Timestamp.fromDate(new Date()),
                    },
                })
            )
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const updateCountRepeat = createAsyncThunk(
    'words/updateCountRepeat',
    async (data, { thunkAPI, dispatch }) => {
        try {
            await dispatch(
                deleteWords({
                    collectionName: collectionNameWords.LEARNED,
                    words: [data.word],
                })
            )
            await dispatch(
                addWords({
                    collectionName: collectionNameWords.LEARNED,
                    word: {
                        ...data.word,
                        countRepeat: data.countRepeat,
                        dateChange: Timestamp.fromDate(new Date()),
                    },
                })
            )

            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const learnedWordDropToInProgress = createAsyncThunk(
    'words/learnedWordDropToInProgress',
    async (data, { thunkAPI, dispatch }) => {
        try {
            await dispatch(
                deleteWords({
                    collectionName: collectionNameWords.LEARNED,
                    words: [data.word],
                })
            )
            await dispatch(
                addWords({
                    collectionName: collectionNameWords.IN_PROCESS,
                    word: {
                        ...data.word,
                        countRepeat: data.countRepeat,
                        knowledge: data.knowledge,
                        dateChange: Timestamp.fromDate(new Date()),
                    },
                })
            )

            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const inProcessWordDropToNow = createAsyncThunk(
    'words/inProcessWordDropToNow',
    async (data, { thunkAPI, dispatch }) => {
        try {
            await dispatch(
                deleteWords({
                    collectionName: collectionNameWords.IN_PROCESS,
                    words: [data.word],
                })
            )
            await dispatch(
                addWords({
                    collectionName: collectionNameWords.NEW,
                    word: {
                        ...data.word,
                        countRepeat: 0,
                        knowledge: knowWord.A0.code,
                        dateChange: Timestamp.fromDate(new Date()),
                    },
                })
            )

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
