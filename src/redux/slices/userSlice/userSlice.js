import { createSlice } from '@reduxjs/toolkit'
import { getAuthUser, logOutUser } from './userAsync'

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
            state.displayName = action.payload.displayName
            state.photoURL = action.payload.photoURL
            state.email = action.payload.email
            state.token = action.payload.accessToken
            state.id = action.payload.uid
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
        builder.addCase(getAuthUser.pending, () => {
            return { ...initialState, isLoading: true }
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
            state.error = action.payload
        })

        // logOutUser
        builder.addCase(logOutUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(logOutUser.fulfilled, () => initialState)
        builder.addCase(logOutUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
