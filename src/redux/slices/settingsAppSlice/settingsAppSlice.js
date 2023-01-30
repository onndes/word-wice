import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tableVocabulary: {
        rowsPerPage: +localStorage.getItem('rowsPerPage') || 5,
    },
    isOnline: true,
}

const settingsAppSlice = createSlice({
    name: 'settingsAppSlice',
    initialState,
    reducers: {
        setRowsPerPage(state, { payload }) {
            localStorage.setItem('rowsPerPage', payload)
            state.tableVocabulary.rowsPerPage = payload
        },
        setIsOnline(state, { payload }) {
            state.isOnline = payload
        },
    },
})

export const { setRowsPerPage, setIsOnline } = settingsAppSlice.actions

export default settingsAppSlice.reducer
