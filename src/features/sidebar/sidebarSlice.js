/**
 *  This file contains the Redux slice for the sidebar feature .
 * It exports the Redux reducer and an async thunk for fetching data from the API.
 * The sidebar slice manages the state for the crypto data, status, and error.
 * The fetchData async thunk is used to fetch data from the API based on the selected base currency.
 * The fetched data is stored in the cryptoData state.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
import { fetchFromUrl } from "../../services/fetchFromUrl";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

/**
 * The initial state for the sidebar slice.
 * @type {Object}
 * @property {Array} cryptoData - The array of crypto data fetched from the API.
 * @property {string} status - The status of the data fetching process ("idle", "loading", "error").
 * @property {string|null} error - The error message if the data fetching process fails.
 */
const initialState = {
  cryptoData: [],
  status: "idle",
  error: null,
};

/**
 * Async thunk for fetching data from the API.
 * @function fetchData
 * @param {string} baseCurrency - The base currency for fetching the crypto data.
 * @returns {Promise<Array>} The fetched crypto data.
 */
export const fetchData = createAsyncThunk(
  "sidebar/fetchData",
  async (baseCurrency) => {
    const url = `${BASE_URL}coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=100&page=1&${API_KEY_TYPE}=${API_KEY}`;

    return await fetchFromUrl(url);
  },
);

/**
 * The Redux slice for the sidebar feature.
 * @type {Object}
 * @property {Object} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for the slice (none in this case).
 * @property {Object} extraReducers - The extra reducers for handling the async thunk actions.
 */
const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "idle";
        state.cryptoData = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "error";
        state.error = "Failed to load data";
      });
  },
});

/**
 * The reducer function for the sidebar slice.
 * @type {Function}
 */
export default sideBarSlice.reducer;
