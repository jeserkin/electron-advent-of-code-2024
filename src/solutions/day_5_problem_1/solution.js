(function (input) {

    const validatePageUpdateOrder = (rules, pagesUpdateOrder) => {
        return pagesUpdateOrder.every((page, i, arr) => arr.slice(i + 1)
            .every(otherItem => rules.indexOf(`${page}|${otherItem}`) > -1));
    };

    const splitter = `\r\n`;
    let [rules, pageUpdates] = input.split(`${splitter}${splitter}`);

    rules = rules.split(`${splitter}`);

    const validUpdates = [];

    pageUpdates.split(`${splitter}`)
        .map(pagesUpdate => pagesUpdate.match(/(\d+),?/g)
            .map(item => parseInt(item)))
        .forEach(pagesUpdate => {
            if (validatePageUpdateOrder(rules, pagesUpdate)) {
                validUpdates.push(pagesUpdate);
            }
        });

    return validUpdates.map(update => update[Math.floor(update.length / 2)])
        .reduce((partialSum, a) => partialSum + a, 0);
});