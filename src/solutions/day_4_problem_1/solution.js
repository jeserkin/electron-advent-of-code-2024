(function (input) {
    const MATCH_AGAINST = ['XMAS', 'SAMX'];

    const grepHorizontalXmas = (sheet, rowIndex, columnIndex, combinations) => {
        const line = sheet[rowIndex];

        let positionOne   = columnIndex,
            positionTwo   = columnIndex + 1,
            positionThree = columnIndex + 2,
            positionFour  = columnIndex + 3;

        if (positionFour >= line.length) {
            return false;
        }

        let formedLine = `${line[positionOne]}${line[positionTwo]}${line[positionThree]}${line[positionFour]}`;

        if (MATCH_AGAINST.includes(formedLine)) {
            combinations.push([
                `${rowIndex},${positionOne}`,
                `${rowIndex},${positionTwo}`,
                `${rowIndex},${positionThree}`,
                `${rowIndex},${positionFour}`
            ]);
            return true;
        }

        positionOne   = columnIndex;
        positionTwo   = columnIndex - 1;
        positionThree = columnIndex - 2;
        positionFour  = columnIndex - 3;

        if (positionFour < 0) {
            return false;
        }

        formedLine = `${line[positionOne]}${line[positionTwo]}${line[positionThree]}${line[positionFour]}`;

        if (MATCH_AGAINST.includes(formedLine)) {
            combinations.push([
                `${rowIndex},${positionOne}`,
                `${rowIndex},${positionTwo}`,
                `${rowIndex},${positionThree}`,
                `${rowIndex},${positionFour}`
            ]);
            return true;
        }
        return false;
    };

    const grepVerticalXmas = (sheet, rowIndex, columnIndex, combinations) => {
        let rowPositionOne   = rowIndex,
            rowPositionTwo   = rowIndex + 1,
            rowPositionThree = rowIndex + 2,
            rowPositionFour  = rowIndex + 3;

        if (rowPositionFour >= sheet.length) {
            return false;
        }

        let formedColumn = `${sheet[rowPositionOne][columnIndex]}${sheet[rowPositionTwo][columnIndex]}${sheet[rowPositionThree][columnIndex]}${sheet[rowPositionFour][columnIndex]}`;

        if (MATCH_AGAINST.includes(formedColumn)) {
            combinations.push([
                `${rowPositionOne},${columnIndex}`,
                `${rowPositionTwo},${columnIndex}`,
                `${rowPositionThree},${columnIndex}`,
                `${rowPositionFour},${columnIndex}`
            ]);
            return true;
        }

        rowPositionOne   = rowIndex;
        rowPositionTwo   = rowIndex - 1;
        rowPositionThree = rowIndex - 2;
        rowPositionFour  = rowIndex - 3;

        if (rowPositionFour < 0) {
            return false;
        }

        formedColumn = `${sheet[rowPositionOne][columnIndex]}${sheet[rowPositionTwo][columnIndex]}${sheet[rowPositionThree][columnIndex]}${sheet[rowPositionFour][columnIndex]}`;

        if (MATCH_AGAINST.includes(formedColumn)) {
            combinations.push([
                `${rowPositionOne},${columnIndex}`,
                `${rowPositionTwo},${columnIndex}`,
                `${rowPositionThree},${columnIndex}`,
                `${rowPositionFour},${columnIndex}`
            ]);
            return true;
        }
        return false;
    };

    const grepDiagonalXmas = (sheet, rowIndex, columnIndex, combinations) => {
        if (rowIndex - 3 < 0 || columnIndex + 3 >= sheet[rowIndex].length) {
            return false;
        }

        const formedDiagonal = `${sheet[rowIndex][columnIndex]}${sheet[rowIndex - 1][columnIndex + 1]}${sheet[rowIndex - 2][columnIndex + 2]}${sheet[rowIndex - 3][columnIndex + 3]}`;

        if (MATCH_AGAINST.includes(formedDiagonal)) {
            combinations.push([
                `${rowIndex},${columnIndex}`,
                `${rowIndex - 1},${columnIndex + 1}`,
                `${rowIndex - 2},${columnIndex + 2}`,
                `${rowIndex - 3},${columnIndex + 3}`
            ]);
            return true;
        }
    };

    const grepAntiDiagonalXmas = (sheet, rowIndex, columnIndex, combinations) => {
        if (rowIndex + 3 >= sheet.length || columnIndex + 3 >= sheet[rowIndex].length) {
            return false;
        }

        const formedDiagonal = `${sheet[rowIndex][columnIndex]}${sheet[rowIndex + 1][columnIndex + 1]}${sheet[rowIndex + 2][columnIndex + 2]}${sheet[rowIndex + 3][columnIndex + 3]}`;

        if (MATCH_AGAINST.includes(formedDiagonal)) {
            combinations.push([
                `${rowIndex},${columnIndex}`,
                `${rowIndex + 1},${columnIndex + 1}`,
                `${rowIndex + 2},${columnIndex + 2}`,
                `${rowIndex + 3},${columnIndex + 3}`
            ]);
            return true;
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
            grepHorizontalXmas(sheet, i, j, combinations);
            grepVerticalXmas(sheet, i, j, combinations);
            grepDiagonalXmas(sheet, i, j, combinations);
            grepAntiDiagonalXmas(sheet, i, j, combinations);
        }
    }

    combinations = combinations.map(combination => {
        combination.sort();
        return combination.join("   ");
    });

    return [...new Set(combinations)].length;
});