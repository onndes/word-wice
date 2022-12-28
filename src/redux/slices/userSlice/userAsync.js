import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export const getAuthUser = createAsyncThunk('user/getAuthUser', async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)

    localStorage.setItem('userData', JSON.stringify(user))

    return user
})

export const logOutUser = createAsyncThunk('user/logOutUser', async () => {
    const auth = getAuth()
    await auth.signOut()

    localStorage.removeItem('userData', JSON.stringify('userData'))
})
