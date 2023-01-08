export const LOGIN_ROUTE = '/login'
export const HOME_ROUTE = '/home'
export const VOCABULARY_ROUTE = '/vocabulary'
export const LEARN_WORDS_ROUTE = '/learn-words'

export const DRAWER_WIDTH = 240

export const isLoading = {
    ADD_WORDS: 'ADD_WORDS',
    FETCH_WORDS: 'FETCH_WORDS',
    DELETE_WORDS: 'DELETE_WORDS',
}

export const formAddWordProps = {
    word: {
        label: 'Word',
        name: 'word',
    },
    translation: {
        label: 'Translation',
        name: 'translation',
    },
    transcription: {
        label: 'Transcription',
        name: 'transcription',
    },
}
