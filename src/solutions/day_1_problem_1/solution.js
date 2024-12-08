(function(input) {
    const listOne = [];
    const listTwo = [];
    input.split('\r\n')
        .map(item => item.match(/(\d+)\s+(\d+)/))
        .forEach(parsedItem => {
            listOne.push(parseInt(parsedItem[1]));
            listTwo.push(parseInt(parsedItem[2]));
        });
    listOne.sort();
    listTwo.sort();

    const distances = [];

    for(let i = 0; i < listOne.length; i++) {
        distances.push(Math.abs(listOne[i] - listTwo[i]));
    }

    return distances.reduce((partialSum, a) => partialSum + a, 0);
});