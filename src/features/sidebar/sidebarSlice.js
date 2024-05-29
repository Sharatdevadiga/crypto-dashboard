import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
import { fetchFromUrl } from "../../services/fetchFromUrl";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const initialState = {
  cryptoData: [],
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk(
  "sidebar/fetchData",
  async (baseCurrency) => {
    const url = `${BASE_URL}coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=100&page=1&${API_KEY_TYPE}=${API_KEY}`;

    return await fetchFromUrl(url);
  },
);

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

export default sideBarSlice.reducer;
