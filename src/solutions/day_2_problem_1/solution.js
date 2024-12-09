(function (input) {
    const validateDirectionIncreasing = (levels) => {
        for (let i = 1; i < levels.length; i++) {
            const difference = levels[i] - levels[i - 1];

            if (difference <= 0 || difference > 3) {
                return false;
            }
        }
        return true;
    };

    const validateDirectionDecreasing = (levels) => {
        for (let i = 1; i < levels.length; i++) {
            const difference = levels[i - 1] - levels[i];

            if (difference <= 0 || difference > 3) {
                return false;
            }
        }
        return true;
    };

    const validateReport = (levels) => {
        return validateDirectionIncreasing(levels) || validateDirectionDecreasing(levels);
    };

    let safeReports = 0;

    input.split('\r\n')
        .map(item => item.match(/(\d+)/g))
        .forEach(parsedItem => {
            const report = parsedItem.map(consistsOf => parseInt(consistsOf));

            if (validateReport(report)) {
                safeReports++;
            }
        });

    return safeReports;
});