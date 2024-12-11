(function (input) {

    const MATCH_AGAINST = ['MAS', 'SAM'];

    const grepMasInExShape = (sheet, rowIndex, columnIndex, combinations) => {
        if (rowIndex + 2 >= sheet.length || columnIndex + 2 >= sheet[rowIndex].length) {
            return false;
        }

        let leadingDiagonal = `${sheet[rowIndex][columnIndex]}${sheet[rowIndex + 1][columnIndex + 1]}${sheet[rowIndex + 2][columnIndex + 2]}`,
            antiDiagonal = `${sheet[rowIndex + 2][columnIndex]}${sheet[rowIndex + 1][columnIndex + 1]}${sheet[rowIndex][columnIndex + 2]}`;

        if (MATCH_AGAINST.includes(leadingDiagonal) && MATCH_AGAINST.includes(antiDiagonal)) {
            combinations.push([
                `${rowIndex},${columnIndex}`,
                `${rowIndex+1},${columnIndex+1}`,
                `${rowIndex+2},${columnIndex+2}`,
                `${rowIndex+2},${columnIndex}`,
                `${rowIndex},${columnIndex+2}`
            ]);
        }
    };

    const sheet = [];

    input.split('\r\n')
        .forEach(line => sheet.push(line.split('')));

    let combinations = [];

    for (let i = 0; i < sheet.length; i++) {
        const line = sheet[i];
        for (let j = 0; j < line.length; j++) {
            if (!['M', 'S'].includes(line[j])) {
                continue;
            }

            grepMasInExShape(sheet, i, j, combinations);
        }
    }

    combinations = combinations.map(combination => {
        combination.sort();
        return combination.join("   ");
    });

    return [...new Set(combinations)].length;

});