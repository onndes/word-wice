import { doc, setDoc} from 'firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../../firebase'

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
