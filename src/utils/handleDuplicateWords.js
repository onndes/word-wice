export const variantDelDup = {
    data: 'lastUpdateWords',
    knowledgeHigher: 'higherKnowledge',
    knowledgeLower: 'lowerKnowledge',
}

export const handleDuplicateWords = (words, variant = variantDelDup.data) => {
    if (!words.length) return { uniq: [], duplicate: [] }

    const duplicate = []
    const latestObjects = new Map()
    // eslint-disable-next-line no-restricted-syntax
    for (const cur of words) {
        if (latestObjects.has(cur.id)) {
            const acc = latestObjects.get(cur.id)
            const checkData = acc.dateChange >= cur.dateChange
            const checkKH =
                acc.knowledge <= cur.knowledge ? acc.knowledge : cur.knowledge
            const checkKL =
                acc.knowledge <= cur.knowledge ? cur.knowledge : acc.knowledge

            const check =
                // eslint-disable-next-line no-nested-ternary
                variantDelDup.data === variant
                    ? checkData
                    : variantDelDup.knowledgeHigher === variant
                    ? checkKH
                    : checkKL

            const deleteWord = check ? cur : acc
            duplicate.push(deleteWord)
        }
        latestObjects.set(cur.id, cur)
    }

    return { uniq: Array.from(latestObjects.values()), duplicate }
}
