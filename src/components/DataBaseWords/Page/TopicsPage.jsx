import React from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import { topics } from '../../../common/consts/topics'
import { words } from '../../../common/wordsBase'
import useMyTheme from '../../../hooks/useMyTheme'
import ButtonDataBase from '../ButtonDataBase'
import CardsWordsBase from '../CardsWordsBase'

const TopicsPage = ({ linkbase }) => {
    const { t } = useMyTheme()
    const params = useParams()

    if (params?.topic) {
        return <CardsWordsBase words={words[params.id][params.topic]} />
    }

    return (
        <Container maxWidth="xs" disableGutters sx={{ pb: 10 }}>
            {topics[params.id].map((el) => (
                <ButtonDataBase
                    key={el.title}
                    to={`${linkbase}/${params.id}/${el.id}`}
                    text={t(el.title)}
                    mb
                />
            ))}
        </Container>
    )
}

export default TopicsPage
