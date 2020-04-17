const datetime_options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
}

export const timestampToDate = (timestamp) => {
    if (timestamp) {
        return new Intl.DateTimeFormat('default', datetime_options).format(timestamp * 1000);
    } else {
        return null;
    }
}

export const dateToTimestamp = (date) => {
    if (date) {
        return Math.round(date.getTime() / 1000);
    } else {
        return null;
    }
}