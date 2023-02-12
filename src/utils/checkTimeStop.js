import { differenceInHours } from 'date-fns'
import { knowWord } from './consts'

export const checkTimeStop = (words) => {
    return words.filter((word) => {
        const dateChange = Date.parse(word.dateChange.toDate())
        const nowDate = Date.now()
        const durationHours = differenceInHours(nowDate, dateChange)

        if (knowWord[word.knowledge].timeStop) {
            return durationHours > knowWord[word.knowledge].timeStop
        }

        return true
    })
}
