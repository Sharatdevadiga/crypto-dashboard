/**
 * This module contains the Redux slice for managing the data chart state.
 * It includes actions and reducers for fetching and updating chart data.
 *
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentHourInUnix } from "../../utils/helpers";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
import { fetchFromUrl } from "../../services/fetchFromUrl";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

/**
 * The initial state of the data chart slice.
 *
 * @typedef {Object} initialState
 * @property {string} chartType - The type of chart to display (e.g., "line").
 * @property {string[]} selectedCrypto - An array of selected cryptocurrencies.
 * @property {string} fromDate - The starting date for the chart data.
 * @property {number} toDateInUnix - The ending date for the chart data in Unix timestamp format.
 * @property {string} status - The status of the data fetching process (e.g., "idle", "loading", "error").
 * @property {string|null} error - The error message if data fetching fails.
 * @property {Array} chartDataFromAPI - The fetched chart data from the API.
 */

const initialState = {
  chartType: "line",
  selectedCrypto: ["bitcoin"],
  fromDate: "1Y",
  toDateInUnix: getCurrentHourInUnix(),
  status: "idle",
  error: null,
  chartDataFromAPI: [],
};

/**
 * An async thunk action creator for fetching chart data from the API.
 *
 * @async
 * @function fetchChartData
 * @param {Object} params - The parameters for fetching chart data.
 * @param {string} params.from - The starting date for the chart data.
 * @param {string} params.to - The ending date for the chart data.
 * @param {string[]} params.selected - An array of selected cryptocurrencies.
 * @param {string} params.baseCurrency - The base currency for the chart data.
 * @returns {Promise<Array>} A promise that resolves to an array of fetched chart data.
 * @rejects {Error} If an error occurs during the data fetching process.
 */

export const fetchChartData = createAsyncThunk(
  "fetchChartData",
  async ({ from, to, selected, baseCurrency }) => {
    try {
      const promises = selected.map(async (crypto) => {
        const url = `${BASE_URL}coins/${crypto}/market_chart/range?vs_currency=${baseCurrency}&${API_KEY_TYPE}=${API_KEY}&from=${from}&to=${to}`;

        return await fetchFromUrl(url, "history", crypto);
      });
      const results = await Promise.allSettled(promises);
      const successFulResults = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      return successFulResults;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

/**
 * The Redux slice for managing the data chart state.
 *
 * @type {Slice}
 * @name dataChartSlice
 * @property {string} name - The name of the slice.
 * @property {initialState} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for updating the slice state.
 * @property {Function} extraReducers - The extra reducers for handling async actions.
 */

const dataChartSlice = createSlice({
  name: "dataChart",
  initialState,
  reducers: {
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartDataFromAPI = action.payload;
        state.status = "idle";
      })
      .addCase(fetchChartData.rejected, (state) => {
        state.status = "error";
        state.error = "Error loading data";
      });
  },
});

export const { setChartType, setSelectedCrypto, setFromDate, setToDate } =
  dataChartSlice.actions;

export default dataChartSlice.reducer;
