import { doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../../firebase'
import { STATUS } from '../../../utils/handleStatus'

export const subAppSettings = (
    dispatch,
    uid,
    handleStatus,
    setUserSettings
) => {
    const qsUsers = query(doc(db, 'users', uid))

    dispatch(
        handleStatus({
            nameCollection: 'userSettings',
            status: STATUS.loading,
        })
    )

    return onSnapshot(qsUsers, { includeMetadataChanges: true }, (snapshot) => {
        if (snapshot.data().settings)
            dispatch(setUserSettings(snapshot.data().settings))
        dispatch(
            handleStatus({
                nameCollection: 'userSettings',
                status: STATUS.success,
            })
        )
    })
}

export const setSettings = createAsyncThunk(
    'settingsApp/setSettings',
    async (data, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, 'users', getState().user.id)
            const name = `settings.${data.name}`
            await updateDoc(docRef, {
                [name]: data.value,
            })
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
