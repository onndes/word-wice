export async function fetchWordBase(path) {
    try {
        const response = await fetch(path)
        if (!response.ok) {
            throw new Error(`Ошибка загрузки файла: ${response.statusText}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Ошибка при получении базы слов:', error)
        throw error
    }
}
