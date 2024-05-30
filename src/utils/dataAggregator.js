/**
 * Aggregates data based on the specified period.
 *
 * @param {Array<Array<any>>} data - The data to be aggregated.
 * @param {string} period - The period for aggregation. Possible values are "1D", "1W", "1M", "6M", "1Y".
 * @returns {Array<Array<any>>} - The aggregated data.
 * @throws {Error} - If an invalid period is provided.
 */
export default function aggregateData(data, period) {
  let result = [];
  period = getPeriod(period);

  switch (period) {
    case "2hour":
      result = aggregateByHours(data, 2);
      break;
    case "daily":
      result = aggregateByDays(data, 1);
      break;
    case "3day":
      result = aggregateByDays(data, 3);
      break;
    case "15day":
      result = aggregateByDays(data, 15);
      break;
    case "monthly":
      result = aggregateByMonths(data);
      break;
    default:
      throw new Error(`Invalid period: ${period}`);
  }

  return result;
}

/**
 * Converts the duration to the corresponding period.
 *
 * @param {string} duration - The duration. Possible values are "1D", "1W", "1M", "6M", "1Y".
 * @returns {string} - The corresponding period.
 */
export function getPeriod(duration) {
  switch (duration) {
    case "1D":
      return "2hour";
    case "1W":
      return "daily";
    case "1M":
      return "3day";
    case "6M":
      return "15day";
    case "1Y":
      return "monthly";
    default:
      return "daily";
  }
}

/**
 * Aggregates data by hours.
 *
 * @param {Array<Array<any>>} data - The data to be aggregated.
 * @param {number} hours - The number of hours to aggregate by.
 * @returns {Array<Array<any>>} - The aggregated data.
 */
function aggregateByHours(data, hours) {
  let result = {};

  data.forEach(([timestamp, value]) => {
    const date = new Date(timestamp); // Convert to milliseconds
    // Round down to the nearest multiple of `hours`
    date.setHours(Math.floor(date.getHours() / hours) * hours, 0, 0, 0);
    const day = String(date.getDate()).padStart(2, "0");
    const key = `${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12} ${date.getHours() >= 12 ? "PM" : "AM"} (${day})`;

    if (!result[key]) {
      result[key] = { sum: value, count: 1 };
    } else {
      result[key].sum += value;
      result[key].count += 1;
    }
  });

  // Calculate average and format result
  for (const key in result) {
    result[key] = (result[key].sum / result[key].count).toFixed(2);
  }

  // sort
  const resultArray = Object.entries(result).sort(
    ([keyA], [keyB]) =>
      new Date(keyA.split(", ")[0]) - new Date(keyB.split(", ")[0]),
  );

  return resultArray;
}

/**
 * Aggregates data by days.
 *
 * @param {Array<Array<any>>} data - The data to be aggregated.
 * @param {number} days - The number of days to aggregate by.
 * @returns {Array<Array<any>>} - The aggregated data.
 */

function aggregateByDays(data, days) {
  let result = {};

  data.forEach(([timestamp, value]) => {
    const date = new Date(timestamp);
    date.setDate(Math.floor(date.getDate() / days) * days);
    date.setHours(0, 0, 0, 0);

    // Format date as "dd/mm/yy"
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
    const year = String(date.getFullYear()).substr(-2); // Get last two digits of year

    const key = `${day}/${month}/${year}`;

    if (!result[key]) {
      result[key] = { sum: value, count: 1 };
    } else {
      result[key].sum += value;
      result[key].count += 1;
    }
  });

  // Calculate average and format result
  for (const key in result) {
    if (key.split("/")[1] === "31") {
      delete result[key];
      continue;
    }
    result[key] = (result[key].sum / result[key].count).toFixed(2);
  }

  const resultArray = Object.entries(result).sort(([keyA], [keyB]) => {
    const dateA = new Date(keyA.split("/").reverse().join("/"));
    const dateB = new Date(keyB.split("/").reverse().join("/"));
    return dateA - dateB;
  });

  return resultArray;
}

/**
 * Aggregates data by months.
 *
 * @param {Array<Array<any>>} data - The data to be aggregated.
 * @returns {Array<Array<any>>} - The aggregated data.
 */

function aggregateByMonths(data) {
  let result = {};

  data.forEach(([timestamp, value]) => {
    const date = new Date(timestamp); // Convert to milliseconds
    // Set the date to the first day of the month
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    const key = date.toLocaleDateString("default", {
      month: "short",
      year: "2-digit",
    });

    if (!result[key]) {
      result[key] = { sum: value, count: 1 };
    } else {
      result[key].sum += value;
      result[key].count += 1;
    }
  });

  // Calculate average and format result
  for (const key in result) {
    result[key] = (result[key].sum / result[key].count).toFixed(2);
  }

  const resultArray = Object.entries(result).sort(
    ([keyA], [keyB]) => new Date(keyA) - new Date(keyB),
  );

  return resultArray;
}
