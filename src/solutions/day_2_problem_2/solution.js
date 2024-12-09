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

    const validateReport = (levels) => validateDirectionIncreasing(levels) || validateDirectionDecreasing(levels);

    const attemptToFixReport = (safeReports, levels) => {
        for (let i = 0; i < levels.length; i++) {
            const copyLevels = [...levels];
            copyLevels.splice(i, 1);

            if (validateReport(copyLevels)) {
                return safeReports + 1;
            }
        }

        return safeReports;
    };

    let safeReports = 0;

    input.split('\r\n')
        .map(item => item.match(/(\d+)/g))
        .forEach(parsedItem => {
            const report = parsedItem.map(consistsOf => parseInt(consistsOf));

            if (validateReport(report)) {
                safeReports++;
            } else {
                console.log(report);
                safeReports = attemptToFixReport(safeReports, report);
            }
        });

    return safeReports;
});