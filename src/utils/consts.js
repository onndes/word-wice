export const LOGIN_ROUTE = '/login'
export const WORDS_ROUTE = '/words'
export const LEARN_WORDS_ROUTE = '/learn'
export const MENU_ROUTE = '/menu'
export const ADD_WORD_ROUTE = '/add-word'
export const PROFILE_ROUTE = '/profile'
export const LEARN_NEW_ROUTE = '/learn/new'
export const LEARN_REPEAT_ROUTE = '/learn/repeat'

export const fieldsData = {
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
        timeStop: 2,
    },
    C1: {
        code: 'C1',
        tittle: 'Know',
        color: '#42a5f5',
        timeStop: 24,
    },
    C2: {
        code: 'C2',
        tittle: 'Learned',
        color: '#5e35b1',
        timeStop: 24,
    },
}

export const collectionNameWords = {
    NEW: 'newWords',
    IN_PROCESS: 'inProcessWords',
    LEARNED: 'learnedWords',
}
