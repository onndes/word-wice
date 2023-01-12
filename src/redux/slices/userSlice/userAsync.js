import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { resetStateWords } from '../wordsSlice/wordsSlice'

export const getAuthUser = createAsyncThunk(
    'user/getAuthUser',
    async (_, { thunkAPI }) => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const { user } = await signInWithPopup(auth, provider)

            await updateDoc(doc(db, 'users', user.uid), {}, { marge: true })

            return user
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const logOutUser = createAsyncThunk(
    'user/logOutUser',
    async (_, { thunkAPI, dispatch }) => {
        try {
            const auth = getAuth()
            await auth.signOut()
            dispatch(resetStateWords())
            return auth
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
