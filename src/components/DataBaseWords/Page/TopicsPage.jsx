import { PartyModeSharp } from '@mui/icons-material'
import { Container } from '@mui/material'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import words from '../../../common/wordsBase'
import useMyTheme from '../../../hooks/useMyTheme'
import { LEVEL_BASE_WORDS_ROUTE } from '../../../utils/consts'
import ButtonDataBase from '../ButtonDataBase'
import CardsWordsBase from '../CardsWordsBase'

const topics = {
    A1: [
        { id: 'adjectives', title: 'Adjectives' },
        { id: 'adverbs', title: 'Adverbs' },
        { id: 'verbs', title: 'Verbs' },
        { id: 'family', title: 'Family' },
        { id: 'socialCommunication', title: 'Social communication' },
        { id: 'theWorld', title: 'The World' },
        { id: 'tourist', title: 'Tourist' },
    ],
    A2: [
        { id: 'adjectives', title: 'Adjectives' },
        { id: 'adverbs', title: 'Adverbs' },
        { id: 'verbs', title: 'Verbs' },
        {
            id: 'careerAndProfessionalDevelopment',
            title: 'Career and professional development',
        },
        { id: 'climateNatureProtection', title: 'Climate nature protection' },
        {
            id: 'entertainmentAndRecreation',
            title: 'Entertainment and recreation',
        },
    ],
    B1: [
        { id: 'adjectives', title: 'Adjectives' },
        { id: 'adverbs', title: 'Adverbs' },
        { id: 'verbs', title: 'Verbs' },
        {
            id: 'lifeSuccessesAndFailures',
            title: 'Life successes and failures',
        },
        {
            id: 'socialInteractionThePostCOVIDperiod',
            title: 'Social interaction in the Post COVID period',
        },
        { id: 'youthModernManners', title: 'Youth modern manners' },
    ],
    B2: [
        { id: 'adjectives', title: 'Adjectives' },
        { id: 'adverbs', title: 'Adverbs' },
        { id: 'verbs', title: 'Verbs' },
        { id: 'modernEducation', title: 'Modern education' },
        { id: 'modernLiterature', title: 'Modern literature' },
        { id: 'socialTrends', title: 'Social trends' },
    ],
    C1: [
        { id: 'adjectives', title: 'Adjectives' },
        { id: 'adverbs', title: 'Adverbs' },
        { id: 'verbs', title: 'Verbs' },
        {
            id: 'personalityAndSocialBehavior',
            title: 'Personality and social behavior',
        },
        { id: 'scientificResearch', title: 'Scientific research' },
        { id: 'theEarth', title: 'TheEarth' },
    ],
}

const TopicsPage = () => {
    const location = useLocation()
    const params = useParams()

    if (params?.topic) {
        return <CardsWordsBase words={words[params.id][params.topic]} />
    }

    return (
        <Container maxWidth="xs" disableGutters sx={{ pb: 10 }}>
            {topics[params.id].map((el) => (
                <ButtonDataBase
                    key={el.title}
                    to={`${LEVEL_BASE_WORDS_ROUTE}/${params.id}/${el.id}`}
                    text={el.title}
                    // color={theme.palette}
                    mb
                />
            ))}
        </Container>
    )
}

export default TopicsPage
