import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tableVocabulary: {
        rowsPerPage: +localStorage.getItem('rowsPerPage') || 5,
    },
}

const settingsAppSlice = createSlice({
    name: 'settingsAppSlice',
    initialState,
    reducers: {
        setRowsPerPage(state, { payload }) {
            localStorage.setItem('rowsPerPage', payload)
            state.tableVocabulary.rowsPerPage = payload
        },
    },
})

export const { setRowsPerPage } = settingsAppSlice.actions

export default settingsAppSlice.reducer
