import { knowWord } from './consts'

export const defineNextKnow = (step, currentKey) => {
    const keys = Object.keys(knowWord)
    const idx = keys.indexOf(currentKey)
    if (currentKey === keys[1] && step === 'prev') return currentKey
    if (currentKey === keys[keys.length - 1] || currentKey === keys[0])
        return currentKey
    if (step === 'next') return keys[idx + 1]
    return keys[idx - 1]
}
