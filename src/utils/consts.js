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
        color: '#d1d1d1',
    },
    A1: {
        code: 'A1',
        tittle: 'Learning',
        color: '#a18c85',
    },
    A2: {
        code: 'A2',
        tittle: 'Low',
        color: '#517D6B',
    },
    B1: {
        code: 'B1',
        tittle: 'Medium',
        color: '#1AB074',
    },
    B2: {
        code: 'B2',
        tittle: 'Height',
        color: '#3bbb3f',
        timeStop: 2,
    },
    C1: {
        code: 'C1',
        tittle: 'Know',
        color: '#a569a2',
        timeStop: 24,
    },
    C2: {
        code: 'C2',
        tittle: 'Learned',
        color: '#8C1AB0',
        timeStop: 24,
    },
}

export const collectionNameWords = {
    NEW: 'newWords',
    IN_PROCESS: 'inProcessWords',
    LEARNED: 'learnedWords',
}
