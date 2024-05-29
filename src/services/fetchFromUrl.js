export const fetchFromUrl = async (url, resDataType = null, crypto = null) => {
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
