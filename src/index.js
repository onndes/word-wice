import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './firebase'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        </BrowserRouter>
    </Provider>
)

serviceWorkerRegistration.register()
