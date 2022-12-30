export const addIsLoading = (isLoadingName, state) => {
    return [...state.isLoading, isLoadingName]
}
export const removeIsLoading = (isLoadingName, state) => {
    return state.isLoading.filter((l) => l !== isLoadingName)
}
