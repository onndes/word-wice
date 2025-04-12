import { createSlice } from '@reduxjs/toolkit'
import { fieldsData } from '../../../utils/consts'
import { variantDelDup } from '../../../utils/handleDuplicateWords'
import { setStatus } from '../../../utils/handleStatus'
import { setSettings } from './settingsAppAsync'
import { ModeLearn } from '../../../common/consts/const'

const initialState = {
    wordsList: {
        rowsPerPage: +localStorage.getItem('rowsPerPage') || 5,
        order: localStorage.getItem('wordsListOrder') || 'desc',
        orderBy: localStorage.getItem('wordsListOrderBy') || 'dateCreated',
        selected: [],
        page: 0,
    },
    wordLearn: {
        isDisabledInput: false,
    },
    user: {
        recommendForLearn: +localStorage.getItem('recommendForLearn') || 5,
        variantDelDuplicate: variantDelDup.data,
        show: fieldsData.translation.name,
        isEaseMode: localStorage.getItem('isEaseMode') || ModeLearn.normal,
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
            localStorage.setItem('wordsListOrder', payload)
            state.wordsList.order = payload
        },
        setOrderBy(state, { payload }) {
            localStorage.setItem('wordsListOrderBy', payload)
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
        setEaseMode(state, { payload }) {
            localStorage.setItem('isEaseMode', payload)
            state.user.isEaseMode = payload
        },
        setDisabledInput(state, { payload }) {
            state.wordLearn.isDisabledInput = payload
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
    setEaseMode,
    setDisabledInput,
} = settingsAppSlice.actions

export default settingsAppSlice.reducer
