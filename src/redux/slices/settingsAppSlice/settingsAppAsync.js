import { doc, setDoc, query, onSnapshot } from 'firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../../firebase'

export const fetchUserSettings = createAsyncThunk(
    'settingsApp/fetchUserSettings',
    async (_, { thunkAPI, getState }) => {
        try {
            const qs = query(doc(db, 'users', getState().user.id))
            const data = {}
            const promise = new Promise((resolve) => {
                data.unSub = onSnapshot(
                    qs,
                    { includeMetadataChanges: true },
                    (snapshot) => {
                        data.settings = snapshot.data().settings
                        resolve()
                    }
                )
            })
            await Promise.all([promise])
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const setRecommendForLearn = createAsyncThunk(
    'settingsApp/setRecommendForLearn',
    async (recommendForLearn, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, 'users', getState().user.id)
            const s = recommendForLearn
            await setDoc(docRef, {
                settings: { recommendForLearn: s },
            })
            return recommendForLearn
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
