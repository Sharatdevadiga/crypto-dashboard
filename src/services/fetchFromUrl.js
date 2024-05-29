/**
 * Fetches data from a specified URL and returns the response data.
 * @param {string} url - The URL to fetch data from.
 * @param {string} resDataType - The type of response data expected.
 * @param {string|null} crypto - Optional parameter representing the cryptocurrency.
 * @returns {Promise<any>} - A promise that resolves to the fetched data or rejects with an error.
 */

export const fetchFromUrl = async (url, resDataType, crypto = null) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Loading failed");
    const data = await res.json();
    if (resDataType === "history" && crypto) return [crypto, data.prices];
    return data;
  } catch (err) {
    return Promise.reject(new Error("Fetching failed"));
  }
};
