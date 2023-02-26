import React, { lazy, Suspense } from 'react'
import LoaderPage from '../components/LoaderPage/LoaderPage'

const DynamicСategoriesPage = lazy(() =>
    import('../components/DataBaseWords/Page/СategoriesPage')
)

const WordsBase = () => {
    return (
        <Suspense fallback={<LoaderPage />}>
            <DynamicСategoriesPage />
        </Suspense>
    )
}

export default WordsBase
