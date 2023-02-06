import { doc, onSnapshot, query, setDoc } from 'firebase/firestore'
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
        dispatch(setUserSettings(snapshot.data().settings))
        dispatch(
            handleStatus({
                nameCollection: 'userSettings',
                status: STATUS.success,
            })
        )
    })
}

export const setRecommendForLearn = createAsyncThunk(
    'settingsApp/setRecommendForLearn',
    async (recommendForLearn, { thunkAPI, getState }) => {
        try {
            const docRef = doc(db, 'users', getState().user.id)
            const s = recommendForLearn
            await setDoc(docRef, {
                settings: { recommendForLearn: s },
            })
            return recommendForLearn
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
