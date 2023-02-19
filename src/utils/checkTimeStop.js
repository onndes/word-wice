import { differenceInHours } from 'date-fns'
import { knowWord } from './consts'

export const checkTimeStop = (words) => {
    return words.filter((word) => {
        const dateChange = Date.parse(word.dateChange.toDate())
        const nowDate = Date.now()
        const durationHours = differenceInHours(nowDate, dateChange)

        if (word.knowledge !== knowWord.C2.code) {
            return durationHours > knowWord[word.knowledge].timeStop
        }

        if (word.countRepeat === 0) {
            return durationHours > knowWord[word.knowledge].timeStop
        }
        if (word.countRepeat <= 5) {
            return durationHours > knowWord[word.knowledge].timeStop * 3
        }
        if (word.countRepeat > 5 && word.countRepeat <= 10) {
            return durationHours > knowWord[word.knowledge].timeStop * 14
        }
        if (word.countRepeat > 10 && word.countRepeat <= 15) {
            return durationHours > knowWord[word.knowledge].timeStop * 30
        }
        if (word.countRepeat > 15 && word.countRepeat <= 20) {
            return durationHours > knowWord[word.knowledge].timeStop * 183
        }
        return durationHours > knowWord[word.knowledge].timeStop * 365
    })
}
