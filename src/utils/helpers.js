/**
 * @file This file contains utility functions for string manipulation and date handling.
 */

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
export function capitilize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a date object to a Unix timestamp.
 *
 * @param {Date} date - The input date object.
 * @returns {number} The Unix timestamp.
 */
export function toUnixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

/**
 * Converts a Unix timestamp to a normal date string.
 *
 * @param {number} unixTimestamp - The input Unix timestamp.
 * @returns {string} The normal date string.
 */
export function unixToNormalTime(unixTimestamp) {
  return new Date(unixTimestamp).toDateString();
}

/**
 * Gets the current hour in Unix timestamp format.
 *
 * @returns {number} The current hour in Unix timestamp format.
 */
export function getCurrentHourInUnix() {
  const date = new Date();
  date.setMinutes(0, 0, 0); // Set the minutes and seconds to 0

  return toUnixTimestamp(date);
}

/**
 * Gets the Unix timestamp for a date based on a given period.
 *
 * @param {string} period - The period in the format of "XU" where X is a number and U is a unit (D, W, M, Y).
 * @returns {number} The Unix timestamp for the calculated date.
 */
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
