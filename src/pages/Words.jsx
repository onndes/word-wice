import { lazy } from 'react'
import AddWordMobile from '../components/AddWord/Mobile/AddWordMobile'
import usePosition from '../hooks/usePosition'
import useMyTheme from '../hooks/useMyTheme'
import MobileButton from '../components/DataBaseWords/MobileButton'

const DynamicAddWord = lazy(() => import('../components/AddWord/AddWord'))

const DynamicCardsWords = lazy(() =>
    import('../components/CardsWords/CardsWords')
)
const DynamicTableWords = lazy(() =>
    import('../components/TableWords/TableWords')
)

const Words = () => {
    const { mq } = useMyTheme()
    const currentPosition = usePosition()

    return (
        <>
            {mq && currentPosition < 20 && <AddWordMobile />}
            {mq && currentPosition < 20 && <MobileButton />}
            {!mq && <DynamicAddWord />}
            {mq ? <DynamicCardsWords /> : <DynamicTableWords />}
        </>
    )
}

export default Words
