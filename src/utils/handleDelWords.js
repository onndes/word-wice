import { collectionNameWords, knowWord } from './consts'

export const handleDelWords = (words) => {
    const delWords = {
        [collectionNameWords.NEW]: [],
        [collectionNameWords.LEARNED]: [],
        [collectionNameWords.IN_PROCESS]: [],
    }
    words.forEach((el) => {
        if (el.knowledge === knowWord.A0.code) {
            delWords[collectionNameWords.NEW].push(el)
        } else if (el.knowledge === knowWord.C2.code) {
            delWords[collectionNameWords.LEARNED].push(el)
        } else {
            delWords[collectionNameWords.IN_PROCESS].push(el)
        }
    })

    return { keys: Object.keys(delWords), words: delWords }
}
