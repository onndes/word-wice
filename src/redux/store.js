import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice/userSlice'
import wordsSlice from './slices/wordsSlice/wordsSlice'
import settingsAppSlice from './slices/settingsAppSlice/settingsAppSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        words: wordsSlice,
        settingsApp: settingsAppSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
