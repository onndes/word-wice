import { createSlice } from '@reduxjs/toolkit'
import { setStatus } from '../../../utils/handleStatus'
import { setRecommendForLearn } from './settingsAppAsync'

const initialState = {
    wordsList: {
        rowsPerPage: +localStorage.getItem('rowsPerPage') || 5,
        order: 'desc',
        orderBy: 'dateCreated',
        selected: [],
        page: 0,
    },
    recommendForLearn: +localStorage.getItem('recommendForLearn') || 5,
    isOnline: true,
    status: [],
}

const settingsAppSlice = createSlice({
    name: 'settingsApp',
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
        setUserSettings(state, { payload }) {
            state.recommendForLearn = payload.recommendForLearn
            localStorage.setItem('recommendForLearn', payload)
        },
    },
    extraReducers: (builder) => {
        // setRecommendForLearn
        builder.addCase(setRecommendForLearn.pending, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(setRecommendForLearn.fulfilled, (state, action) => {
            setStatus(state, action)
            state.recommendForLearn = action.payload
        })
        builder.addCase(setRecommendForLearn.rejected, (state, action) => {
            setStatus(state, action)
        })
    },
})

export const {
    setRowsPerPage,
    setIsOnline,
    setOrder,
    setSelected,
    setOrderBy,
    setPage,
    setUserSettings,
} = settingsAppSlice.actions

export default settingsAppSlice.reducer
