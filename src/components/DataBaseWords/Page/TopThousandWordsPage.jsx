import React, { lazy } from 'react'
import { topThousandWords } from '../../../common/wordsBase/topThousandWords'
import CardsWordsBase from '../CardsWordsBase'

const TopThousandWordsPage = () => {
    return <CardsWordsBase words={topThousandWords} />
}

export default lazy(() => Promise.resolve({ default: TopThousandWordsPage }))
