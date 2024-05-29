import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const initialState = {
  coins: null,
  status: "idle",
  error: null,
  baseCurrency: "usd",
};

export const fetchCoins = createAsyncThunk(
  "fetchCoins",

  async () => {
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
  },
);

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
      // eslint-disable-next-line no-unused-vars
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
