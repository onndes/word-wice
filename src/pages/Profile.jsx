import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Typography from '@mui/material/Typography'
import { Avatar, Paper, styled } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}))

const Profile = () => {
    const user = useSelector(({ user }) => user)
    const { newWords, inProcessWords, learnedWords } = useSelector(
        ({ words }) => words
    )

    const newWordsCount = newWords.length
    const inProcessWordsCount = inProcessWords.length
    const learnedWordsCount = learnedWords.length
    const allWords = newWordsCount + inProcessWordsCount + learnedWordsCount

    return (
        <Grid container spacing={0.5}>
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
                    <Typography variant="h5" color="initial" mb={1}>
                        {user.displayName}
                    </Typography>
                    <Typography variant="p" color="initial">
                        {user.email}
                    </Typography>
                </Item>
            </Grid>
            <Grid xs={12} direction="column" justifyContent="flex-start">
                <Item>
                    <Typography variant="h6" color="initial" mb={1}>
                        Words in the dictionary
                    </Typography>
                    <Typography variant="h3" color="initial">
                        {allWords}
                    </Typography>
                </Item>
            </Grid>
            <Grid xs={4} direction="column" justifyContent="flex-start">
                <Item>
                    <Typography variant="h6" color="initial" mb={1}>
                        New words
                    </Typography>
                    <Typography variant="h3" color="initial">
                        {newWordsCount}
                    </Typography>
                </Item>
            </Grid>
            <Grid xs={4} direction="column" justifyContent="flex-start">
                <Item>
                    <Typography variant="h6" color="initial" mb={1}>
                        In the study
                    </Typography>
                    <Typography variant="h3" color="initial">
                        {inProcessWordsCount}
                    </Typography>
                </Item>
            </Grid>
            <Grid xs={4} direction="column" justifyContent="flex-start">
                <Item>
                    <Typography variant="h6" color="initial" mb={1}>
                        Learned
                    </Typography>
                    <Typography variant="h3" color="initial">
                        {learnedWordsCount}
                    </Typography>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Profile
