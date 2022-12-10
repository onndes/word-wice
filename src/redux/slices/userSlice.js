import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export const getAuthUser = createAsyncThunk('user/getAuthUser', async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    return user
})

const initialState = {
    displayName: null,
    photoURL: null,
    email: null,
    token: null,
    id: null,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
        },
        removeUser(state) {
            state.displayName = null
            state.photoURL = null
            state.email = null
            state.token = null
            state.id = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthUser.pending, (state) => {
            state.isLoading = true
            state.displayName = null
            state.photoURL = null
            state.email = null
            state.token = null
            state.id = null
        })
        builder.addCase(getAuthUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.displayName = action.payload.displayName
            state.photoURL = action.payload.photoURL
            state.email = action.payload.email
            state.token = action.payload.accessToken
            state.id = action.payload.uid
        })
        builder.addCase(getAuthUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
