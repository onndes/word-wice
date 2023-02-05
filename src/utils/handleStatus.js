export const STATUS = {
    init: 'init',
    loading: 'loading',
    error: 'error',
    success: 'success',
}

export const setStatus = (state, action) => {
    const reqStatus = action.meta.requestStatus
    const nameThunk = action.type.split(/\/(.+?)\//)[1]

    const dataStatus = {
        name: nameThunk,
        status: STATUS.init,
        error: null,
    }

    switch (reqStatus) {
        case 'pending':
            dataStatus.status = STATUS.loading
            if (!state.status.length)
                state.status = [...state.status, dataStatus]
            if (state.status.length) {
                state.status = state.status.map((el) =>
                    el.name === nameThunk ? dataStatus : el
                )
            }
            break
        case 'fulfilled':
            dataStatus.status = STATUS.success
            state.status = state.status.map((el) =>
                el.name === nameThunk ? dataStatus : el
            )
            break
        case 'rejected':
            dataStatus.status = STATUS.error
            dataStatus.error = action.error
            state.status = state.status.map((el) =>
                el.name === nameThunk ? dataStatus : el
            )
            break
        default:
            return state.status
    }
    return state.status
}
