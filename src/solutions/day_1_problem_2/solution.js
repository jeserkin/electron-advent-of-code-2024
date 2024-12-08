(function(input) {
    let listOne = [];
    const listTwo = [];
    input.split('\r\n')
        .map(item => item.match(/(\d+)\s+(\d+)/))
        .forEach(parsedItem => {
            listOne.push(parseInt(parsedItem[1]));
            listTwo.push(parseInt(parsedItem[2]));
        });

    console.log(listOne.length);

    listOne = [...new Set(listOne)];
    const listTwoFrequency = {};

    console.log(listTwo);

    for (const listTwoItem of listTwo) {
        listTwoFrequency[listTwoItem] = listTwoFrequency[listTwoItem] ? listTwoFrequency[listTwoItem] + 1 : 1;
    }

    console.log(listTwoFrequency);

    console.log(listOne.length);
    console.log(listOne);

    const similarityScore = [];

    for(let i = 0; i < listOne.length; i++) {
        similarityScore.push(listOne[i] * (listTwoFrequency[listOne[i]] ? listTwoFrequency[listOne[i]] : 0));
    }

    return similarityScore.reduce((partialSum, a) => partialSum + a, 0);
});