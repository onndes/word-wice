import { knowWord } from './consts'

export const shuffleArray = (array) => {
    const newArr = [...array]
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
}

export const defineNextKnow = (step, currentKey) => {
    const keys = Object.keys(knowWord)
    const idx = keys.indexOf(currentKey)
    if (currentKey === keys[1] && step === 'prev') return currentKey
    if (currentKey === keys[keys.length - 1] || currentKey === keys[0])
        return currentKey
    if (step === 'next') return keys[idx + 1]
    return keys[idx - 1]
}
