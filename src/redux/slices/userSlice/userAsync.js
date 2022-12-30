import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { resetStateWords } from '../wordsSlice/wordsSlice'

export const getAuthUser = createAsyncThunk('user/getAuthUser', async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)

    await updateDoc(doc(db, 'users', user.uid), {}, { marge: true })

    localStorage.setItem('userData', JSON.stringify(user))

    return user
})

export const logOutUser = createAsyncThunk(
    'user/logOutUser',
    async (_, { dispatch }) => {
        const auth = getAuth()
        await auth.signOut()

        dispatch(resetStateWords())

        localStorage.removeItem('userData', JSON.stringify('userData'))
    }
)
