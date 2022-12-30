import { createSlice } from '@reduxjs/toolkit'
import { getAuthUser, logOutUser } from './userAsync'

const userData = JSON.parse(localStorage.getItem('userData'))

const initialState = {
    displayName: userData?.displayName || null,
    photoURL: userData?.photoURL || null,
    email: userData?.email || null,
    token: userData?.accessToken || null,
    id: userData?.uid || null,
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
        // getAuthUser
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

        // logOutUser
        builder.addCase(logOutUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(logOutUser.fulfilled, () => initialState)
        builder.addCase(logOutUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
