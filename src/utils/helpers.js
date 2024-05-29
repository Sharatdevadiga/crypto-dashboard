// string helpers
export function capitilize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// date helpers
export function toUnixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

export function unixToNormalTime(unixTimestamp) {
  return new Date(unixTimestamp).toDateString();
}

export function getCurrentHourInUnix() {
  const date = new Date();
  date.setMinutes(0, 0, 0); // Set the minutes and seconds to 0

  return toUnixTimestamp(date);
}

export function getDateFromPeriodInUnix(period) {
  const date = new Date();
  const value = parseInt(period.slice(0, -1));
  const unit = period.slice(-1);

  switch (unit) {
    case "D":
      date.setDate(date.getDate() - value);
      break;
    case "W":
      date.setDate(date.getDate() - value * 7);
      break;
    case "M":
      date.setMonth(date.getMonth() - value);
      break;
    case "Y":
      date.setFullYear(date.getFullYear() - value);
      break;
    default:
      date.setMonth(date.getMonth() - 6);
  }

  return toUnixTimestamp(date);
}
