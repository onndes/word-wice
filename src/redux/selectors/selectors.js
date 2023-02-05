import { STATUS } from '../../utils/handleStatus'

export const selectStatus = (names, state) => {
    const dataStatus = {
        names: names.length > 1 ? names.join(', ') : names,
        status: STATUS.init,
        allStatus: [],
        error: null,
        allErrors: [],
    }

    if (state.status.length === 0) return dataStatus

    const check = (s) => {
        if (dataStatus.status === STATUS.error || s === STATUS.error)
            return STATUS.error
        if (dataStatus.status === STATUS.loading || s === STATUS.loading)
            return STATUS.loading
        return STATUS.success
    }

    state.status.forEach((s) => {
        names.forEach((n) => {
            if (s.name === n) {
                dataStatus.allStatus.push(s)
                dataStatus.status = check(s.status)
                dataStatus.error =
                    dataStatus.error !== null ? dataStatus.error : s.error
                dataStatus.allErrors.push(s.error)
            }
        })
    })

    return dataStatus
}
