import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getWords = createAsyncThunk('words/getWords', async () => {})

const initialState = {
    words: [
        { word: 'have', translate: 'иметь', transcription: '[ hæv ]' },
        {
            word: 'pay attention to',
            translate: 'уделять внимание',
            transcription: '[ hæv ]',
        },
        {
            word: 'be going to',
            translate: 'собираться что-то делать',
            transcription: '[ hæv ]',
        },
        {
            word: 'achieve a goal',
            translate: 'достичь цели',
            transcription: '[ hæv ]',
        },
        {
            word: 'walk up the stairs',
            translate: 'идти пешком по лестнице',
            transcription: '[ hæv ]',
        },
    ],
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {},
    extraReducers: () => {},
})

export const { setUser, removeUser } = wordsSlice.actions

export default wordsSlice.reducer
