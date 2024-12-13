(function (input) {

    const validatePageUpdateOrder = (rules, pagesUpdateOrder) => {
        return pagesUpdateOrder.every((page, i, arr) => arr.slice(i + 1)
            .every(otherItem => rules.indexOf(`${page}|${otherItem}`) > -1));
    };

    const sortBasedOnRules = (rules, a, b) => {
        const rule = rules.filter(rule => rule[0] === a && rule[1] === b || rule[0] === b && rule[1] === a)[0];
        return a === rule[0] ? -1 : 1;
    };

    const splitter = `\r\n`;
    let [rules, pageUpdates] = input.split(`${splitter}${splitter}`);

    rules = rules.split(`${splitter}`);
    const typedRules = rules.map(rule => rule.match(/(\d+)\|(\d+)/)
        .slice(1, 3)
        .map(item => parseInt(item)));

    const invalidUpdates = [];

    pageUpdates.split(`${splitter}`)
        .map(pagesUpdate => pagesUpdate.match(/(\d+),?/g)
            .map(item => parseInt(item)))
        .forEach(pagesUpdate => {
            if (!validatePageUpdateOrder(rules, pagesUpdate)) {
                pagesUpdate.sort((a, b) => sortBasedOnRules(typedRules, a, b));
                invalidUpdates.push(pagesUpdate);
            }
        });

    return invalidUpdates.map(update => update[Math.floor(update.length / 2)])
        .reduce((partialSum, a) => partialSum + a, 0);
});