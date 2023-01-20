export const LOGIN_ROUTE = '/login'
export const HOME_ROUTE = '/home'
export const VOCABULARY_ROUTE = '/vocabulary'
export const LEARN_WORDS_ROUTE = '/learn-words'

export const DRAWER_WIDTH = 240

export const isLoading = {
    ADD_WORDS: 'ADD_WORDS',
    FETCH_WORDS: 'FETCH_WORDS',
    DELETE_WORDS: 'DELETE_WORDS',
    SUBMIT_STUDY: 'SUBMIT_STUDY',
    UPDATE_KNOWLEDGE: 'UPDATE_KNOWLEDGE',
    SUBMIT_LEARNED: 'SUBMIT_LEARNED',
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

export const knowWord = {
    A0: {
        code: 'A0',
        tittle: 'New',
        color: '#757575',
    },
    A1: {
        code: 'A1',
        tittle: 'Learning',
        color: '#37474f',
    },
    A2: {
        code: 'A2',
        tittle: 'Low',
        color: '#afb42b',
    },
    B1: {
        code: 'B1',
        tittle: 'Medium',
        color: '#fb8c00',
    },
    B2: {
        code: 'B2',
        tittle: 'Height',
        color: '#43a047',
    },
    C1: {
        code: 'C1',
        tittle: 'Know',
        color: '#42a5f5',
    },
    C2: {
        code: 'C2',
        tittle: 'Learned',
        color: '#5e35b1',
    },
}

export const collectionNameWords = {
    NEW: 'newWords',
    IN_PROCESS: 'inProcessWords',
    LEARNED: 'learnedWords',
}
