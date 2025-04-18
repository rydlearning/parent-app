

export default function fetchTimezoneInfo(){
    const currentDate = new Date();
    const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
    const _offset = Math.abs(timezoneOffsetMinutes / 60);
    const offsetSign = _offset > 0 ? "+" : "-";
    const timeOffset = offsetSign + _offset;

    // Get the timezone name (e.g., "Pacific Standard Time")
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return { timeOffset, timezoneName };

}