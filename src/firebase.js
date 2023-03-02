/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
    enableIndexedDbPersistence,
    CACHE_SIZE_UNLIMITED,
    initializeFirestore,
} from 'firebase/firestore'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getPerformance } from 'firebase/performance'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const perf = getPerformance(firebaseApp)

const auth = getAuth(firebaseApp)

const db = initializeFirestore(firebaseApp, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
})

enableIndexedDbPersistence(db, { experimentalForceOwningTab: true })
    .then(() => {
        console.log('Offline persistence enabled!')
    })
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.log('failed-precondition')
        } else if (err.code === 'unimplemented') {
            console.log('unimplemented')
        }
    })
export { auth, db }
