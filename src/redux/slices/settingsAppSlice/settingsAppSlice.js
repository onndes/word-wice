import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wordsList: {
        rowsPerPage: +localStorage.getItem('rowsPerPage') || 5,
        order: 'desc',
        orderBy: 'dateCreated',
        selected: [],
        page: 0,
    },
    isOnline: true,
}

const settingsAppSlice = createSlice({
    name: 'settingsAppSlice',
    initialState,
    reducers: {
        setRowsPerPage(state, { payload }) {
            localStorage.setItem('rowsPerPage', payload)
            state.wordsList.rowsPerPage = payload
        },
        setIsOnline(state, { payload }) {
            state.isOnline = payload
        },
        setOrder(state, { payload }) {
            state.wordsList.order = payload
        },
        setOrderBy(state, { payload }) {
            state.wordsList.orderBy = payload
        },
        setSelected(state, { payload }) {
            state.wordsList.selected = payload
        },
        setPage(state, { payload }) {
            state.wordsList.page = payload
        },
    },
})

export const {
    setRowsPerPage,
    setIsOnline,
    setOrder,
    setSelected,
    setOrderBy,
    setPage,
} = settingsAppSlice.actions

export default settingsAppSlice.reducer
