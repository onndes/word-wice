import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Typography from '@mui/material/Typography'
import { Avatar, Paper, styled } from '@mui/material'
import useMyTheme from '../hooks/useMyTheme'

const Item = styled(Paper)(({ theme, bg }) => ({
    backgroundColor: bg,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}))

const Profile = () => {
    const { t } = useTranslation()
    const { colors } = useMyTheme()
    const user = useSelector(({ user }) => user)
    const { newWords, inProcessWords, learnedWords } = useSelector(
        ({ words }) => words
    )

    const newWordsCount = newWords.length
    const inProcessWordsCount = inProcessWords.length
    const learnedWordsCount = learnedWords.length
    const allWords = newWordsCount + inProcessWordsCount + learnedWordsCount

    return (
        <Grid container spacing={0.8}>
            <Grid xs={5}>
                <Item>
                    <Avatar
                        sx={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '100px',
                            maxHeight: '100px',
                        }}
                        alt="Avatar"
                        src={user.photoURL}
                    />
                </Item>
            </Grid>
            <Grid xs={7} direction="column" justifyContent="flex-start">
                <Item>
                    <Typography variant="h5" mb={1}>
                        {user.displayName}
                    </Typography>
                    <Typography variant="p">{user.email}</Typography>
                </Item>
            </Grid>
            <Grid xs={12} direction="column" justifyContent="flex-start">
                <Item>
                    <Typography variant="h6" mb={1}>
                        {t('Words in the dictionary')}
                    </Typography>
                    <Typography variant="h3">{allWords}</Typography>
                </Item>
            </Grid>
            <Grid xs={4} direction="column" justifyContent="flex-start">
                <Item bg={colors.mocha[500]}>
                    <Typography variant="h6" mb={1} color="white">
                        {t('New words')}
                    </Typography>
                    <Typography variant="h3" color="white">
                        {newWordsCount}
                    </Typography>
                </Item>
            </Grid>
            <Grid xs={4} direction="column" justifyContent="flex-start">
                <Item bg={colors.emerald[500]}>
                    <Typography variant="h6" mb={1} color="white">
                        {t('In the study')}
                    </Typography>
                    <Typography variant="h3" color="white">
                        {inProcessWordsCount}
                    </Typography>
                </Item>
            </Grid>
            <Grid xs={4} direction="column" justifyContent="flex-start">
                <Item bg={colors.indigo[500]}>
                    <Typography variant="h6" mb={1} color="white">
                        {t('Learned')}
                    </Typography>
                    <Typography variant="h3" color="white">
                        {learnedWordsCount}
                    </Typography>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Profile
