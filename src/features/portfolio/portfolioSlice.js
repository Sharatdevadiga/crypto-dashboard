/**
 The portfolioSlice reducer manages the state related to the portfolio data, including market cap data, status, and error.
 * The fetchPortfolioData async thunk is used to fetch the portfolio data from the API.
te accordingly.
 * 
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
import { fetchFromUrl } from "../../services/fetchFromUrl";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const initialState = {
  marketCapData: [],
  status: "idle",
  error: null,
};

export const fetchPortfolioData = createAsyncThunk(
  "fetchPortfolioData",
  async () => {
    const url = `${BASE_URL}global?${API_KEY_TYPE}=${API_KEY}`;
    return await fetchFromUrl(url);
  },
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line no-unused-vars
      .addCase(fetchPortfolioData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.marketCapData = action.payload.data.market_cap_percentage;
        state.status = "idle";
      })
      .addCase(fetchPortfolioData.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      });
  },
});

export default portfolioSlice.reducer;
