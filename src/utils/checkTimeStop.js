import { intervalToDuration } from 'date-fns'
import { knowWord } from './consts'

export const checkTimeStop = (words) => {
    return words.filter((word) => {
        const dateChange = Date.parse(word.dateChange.toDate())
        const nowDate = Date.now()
        const durationHours = intervalToDuration({
            start: dateChange,
            end: nowDate,
        }).hours

        if (knowWord[word.knowledge].timeStop) {
            return durationHours > knowWord[word.knowledge].timeStop
        }

        return true
    })
}
