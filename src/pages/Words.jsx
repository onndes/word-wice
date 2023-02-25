import AddWord from '../components/AddWord/AddWord'
import AddWordMobile from '../components/AddWord/Mobile/AddWordMobile'
import TableWords from '../components/TableWords/TableWords'
import usePosition from '../hooks/usePosition'
import useMyTheme from '../hooks/useMyTheme'
import CardsWords from '../components/CardsWords/CardsWords'
import MobileButton from '../components/DataBaseWords/MobileButton'

const Words = () => {
    const { mq } = useMyTheme()
    const currentPosition = usePosition()

    return (
        <>
            {mq && currentPosition < 20 && <AddWordMobile />}
            {mq && currentPosition < 20 && <MobileButton />}
            {!mq && <AddWord />}
            {mq ? <CardsWords /> : <TableWords />}
        </>
    )
}

export default Words
