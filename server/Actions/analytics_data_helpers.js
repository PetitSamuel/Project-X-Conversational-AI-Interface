function fromDbToFromattedAnalytics(data) {
    if (!data) {
        return null;
    }
    let values = {
        "Monday": {
        },
        "Tuesday": {
        },
        "Wednesday": {
        },
        "Thursday": {
        },
        "Friday": {
        },
        "Saturday": {
        },
        "Sunday": {
        },
    };
    for (const date of data) {
        let parsedDate = new Date(date.last_updated);
        let dayAsString = dayOfWeekAsString(parsedDate.getDay());
        let hoursAsString = parsedDate.getHours().toString();
        if (values[dayAsString][hoursAsString] == null) {
            values[dayAsString][hoursAsString] = 1;
        } else {
            values[dayAsString][hoursAsString]++;
        }
    }

    let arr = [];

    for (const item in values) {
        for (const child in values[item]) {
            arr.push({
                name: item,
                value: parseInt(child),
                count: values[item][child],
            })
        }
    }
    return arr;
}
function dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
}

module.exports = {
    formatDbData: fromDbToFromattedAnalytics,
}
