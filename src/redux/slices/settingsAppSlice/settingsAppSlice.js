import { createSlice } from '@reduxjs/toolkit'
import { fieldsData } from '../../../utils/consts'
import { variantDelDup } from '../../../utils/handleDuplicateWords'
import { setStatus } from '../../../utils/handleStatus'
import { setSettings } from './settingsAppAsync'

const initialState = {
    wordsList: {
        rowsPerPage: +localStorage.getItem('rowsPerPage') || 5,
        order: 'desc',
        orderBy: 'dateCreated',
        selected: [],
        page: 0,
    },
    user: {
        recommendForLearn: +localStorage.getItem('recommendForLearn') || 5,
        variantDelDuplicate: variantDelDup.data,
        show: fieldsData.translation.name
    },
    isOnline: true,
    status: [],
}

const settingsAppSlice = createSlice({
    name: 'settingsApp',
    initialState,
    reducers: {
        removeUserSA() {
            return { ...initialState }
        },
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
            if (payload) {
                const keys = Object.keys(payload)
                keys.forEach((key) => {
                    state.user[key] = payload[key]
                })

                localStorage.setItem('recommendForLearn', payload)
            }
        },
    },
    extraReducers: (builder) => {
        // setSettings
        builder.addCase(setSettings.pending, (state, action) => {
            setStatus(state, action)
        })
        builder.addCase(setSettings.fulfilled, (state, action) => {
            setStatus(state, action)
            // state.user[action.payload.name] = action.payload.value
        })
        builder.addCase(setSettings.rejected, (state, action) => {
            setStatus(state, action)
        })
    },
})

export const {
    removeUserSA,
    setRowsPerPage,
    setIsOnline,
    setOrder,
    setSelected,
    setOrderBy,
    setPage,
    setUserSettings,
} = settingsAppSlice.actions

export default settingsAppSlice.reducer
