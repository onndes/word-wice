import { knowWord } from './consts'

export const shuffleArray = (array) => {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
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
