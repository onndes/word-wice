export const variantDelDup = {
    data: 'lastUpdateWords',
    knowledgeHigher: 'higherKnowledge',
    knowledgeLower: 'lowerKnowledge',
}

export const handleDuplicateWords = (words, variant = variantDelDup.data) => {
    if (!words.length) return { uniq: [], duplicate: [] }

    const removedWords = []
    const latestObjects = words.reduce((acc, cur) => {
        if (acc[cur.id]) {
            const checkData = acc[cur.id].dateChange > cur.dateChange
            const checkKH =
                acc[cur.id].knowledge < cur.knowledge
                    ? acc[cur.id].knowledge
                    : cur.knowledge
            const checkKL =
                acc[cur.id].knowledge < cur.knowledge
                    ? cur.knowledge
                    : acc[cur.id].knowledge

            if (acc[cur.id].dateChange > cur.dateChange) return acc
            const check =
                // eslint-disable-next-line no-nested-ternary
                variantDelDup.data === variant
                    ? checkData
                    : variantDelDup.knowledgeHigher === variant
                    ? checkKH
                    : checkKL
            const deleteWord = check ? cur : acc[cur.id]
            removedWords.push(deleteWord)

            return { ...acc, [cur.id]: cur }
        }
        return { ...acc, [cur.id]: cur }
    }, {})

    return { uniq: Object.values(latestObjects), duplicate: removedWords }
}
