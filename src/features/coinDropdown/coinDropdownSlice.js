/**
 * @description Redux slice for managing the coin dropdown state.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

/**
 * Initial state for the coin dropdown slice.
 * @type {Object}
 * @property {Array|null} coins - The list of supported coins.
 * @property {string} status - The status of the API request.
 * @property {string|null} error - The error message, if any.
 * @property {string} baseCurrency - The base currency for the coin dropdown.
 */
const initialState = {
  coins: null,
  status: "idle",
  error: null,
  baseCurrency: "usd",
};

/**
 * Async thunk for fetching the list of supported coins.
 * @type {Function}
 * @returns {Promise} A promise that resolves to the fetched coin data.
 */
export const fetchCoins = createAsyncThunk("fetchCoins", async () => {
  try {
    const response = await fetch(
      `${BASE_URL}simple/supported_vs_currencies?${API_KEY_TYPE}=${API_KEY}`,
    );
    const data = await response.json();
    if (!data) throw new Error("Failed to fetch coins");
    return { data };
  } catch (err) {
    Promise.reject(err);
  }
});

/**
 * Redux slice for managing the coin dropdown state.
 * @type {Object}
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for updating the state.
 * @property {Object} extraReducers - The extra reducers for handling async actions.
 */
const coinDropDownSlice = createSlice({
  name: "coinDropDown",
  initialState: initialState,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.coins = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setBaseCurrency } = coinDropDownSlice.actions;
export default coinDropDownSlice.reducer;
