(function(input) {

    let programResult = 0;
    let switchOp = null;

    input.match(/(mul\(\d+,\d+\))|(don't\(\))|(do\(\))/mg)
        .forEach(parsedItem => {
            if (parsedItem === 'don\'t()') {
                switchOp = false;
                return;
            } else if (parsedItem === 'do()') {
                switchOp = true;
                return;
            }

            if (switchOp === null || switchOp) {
                const mulOp = parsedItem.match(/(\d+),(\d+)/);
                programResult += parseInt(mulOp[1]) * parseInt(mulOp[2]);
            }
        });

    return programResult;
});