/**
 This module contains the Redux slice for managing the coin exchange feature.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
import { fetchFromUrl } from "../../services/fetchFromUrl";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

/**
 * @typedef {Object} CoinExchangeState
 * @property {string} fromCoin - The selected "from" coin.
 * @property {string} toCoin - The selected "to" coin.
 * @property {string} coinCount - The number of coins to be exchanged.
 * @property {string} rates - The exchange rates.
 * @property {string} convertedVal - The converted value.
 * @property {string} status - The status of the exchange rate fetch operation.
 * @property {string} error - The error message, if any.
 */
const initialState = {
  fromCoin: "btc",
  toCoin: "eth",
  coinCount: "",
  rates: "",
  convertedVal: "",
  state: "",
  error: "",
};

/**
 * Fetches the exchange rate from the API.
 * @async
 * @function fetchExchangeRate
 * @returns {Promise} A promise that resolves to the fetched exchange rate.
 */
export const fetchExchangeRate = createAsyncThunk(
  "fetchExchangeRate",
  async () => {
    const url = `${BASE_URL}exchange_rates?${API_KEY_TYPE}=${API_KEY}`;
    return await fetchFromUrl(url);
  },
);

/**
 * Redux slice for managing the coin exchange feature.
 * @type {Slice}
 */
const coinExchangeSlice = createSlice({
  name: "coinExchange",
  initialState: initialState,
  reducers: {
    setFromCoin: (state, action) => {
      state.fromCoin = action.payload;
    },
    setToCoin: (state, action) => {
      state.toCoin = action.payload;
    },
    setCoinCount: (state, action) => {
      state.coinCount = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line no-unused-vars
      .addCase(fetchExchangeRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.rates = action.payload;
        state.status = "idle";
      })
      .addCase(fetchExchangeRate.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      });
  },
});

export const { setFromCoin, setToCoin, setCoinCount, setBaseCurrency } =
  coinExchangeSlice.actions;
export default coinExchangeSlice.reducer;
