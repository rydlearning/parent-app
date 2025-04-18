/**
 Author: Revelation.AF
 Engine: [//]
 Git: nusktec
 **/
export const restructureTimeData = (data: { day: any; dayText: any; dayAbbr: any; timex: any; timeText: any; }[]) => {

    if (!data[0]?.dayAbbr) return []

    const sortedData: any[] = [];
    // Iterate through each item in the data array
    data?.forEach((item: { day: any; dayText: any; dayAbbr: any; timex: any; timeText: any; }) => {
        // Check if the day already exists in the sortedData array
        let dayEntry = sortedData.find(dayObj => dayObj.day === item.day);

        // If the day does not exist, create a new entry for it
        if (!dayEntry) {
            dayEntry = {
                day: item.day,
                dayText: item.dayText,
                dayAbbr: item.dayAbbr,
                times: []
            };
            sortedData.push(dayEntry);
        }

        // Add the current time slot to the day's times array
        dayEntry?.times?.push({
            time: item.timex,
            timeText: item.timeText
        });
    });

    // Sort the sortedData array by 'day' and each 'times' array by 'time'
    sortedData.sort((a, b) => a.day - b.day);
    sortedData.forEach(dayObj => {
        dayObj.times.sort((a: { time: number; }, b: { time: number; }) => a.time - b.time);
    });

    return sortedData;
}


export const filterDaysOfTheWeek = (data: any) => {
    let xdayArr = []
    // extracted dayText and day values and saved them as 'name' and 'value' respectively for ease of use in the custom dropdown component
    for (let i = 0; i < data.length; i++) {
        let name = data[i].dayText;
        let value = data[i].day;
        let dx = {name, value};
        xdayArr.push(dx);
    }
    return xdayArr;
}
