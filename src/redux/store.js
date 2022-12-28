import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import wordsSlice from './slices/wordsSlice/wordsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        words: wordsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
