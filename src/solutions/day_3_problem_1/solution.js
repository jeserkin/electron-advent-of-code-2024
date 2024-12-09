(function(input) {

    let programResult = 0;

    input.match(/(mul\(\d+,\d+\))/mg)
        .forEach(parsedItem => {
            const mulOp = parsedItem.match(/(\d+),(\d+)/);
            programResult += parseInt(mulOp[1]) * parseInt(mulOp[2]);
        });

    return programResult;
});