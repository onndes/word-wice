import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

import { privateRoutes, publicRoutes } from './routes'
import { LOGIN_ROUTE, WORDS_ROUTE } from './utils/consts'

const AppRouter = () => {
    const { isAuth } = useAuth()

    return isAuth ? (
        <Routes>
            {privateRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={Component} />
            ))}
            <Route path="*" element={<Navigate to={WORDS_ROUTE} replace />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={Component} />
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    )
}

export default AppRouter
