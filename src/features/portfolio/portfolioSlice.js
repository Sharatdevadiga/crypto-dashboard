import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "CG-WBiAUmyhrtqMvAUk27pVsTaj";

const initialState = {
  marketCapData: [],
  status: "idle",
  error: null,
};

export const fetchPortfolioData = createAsyncThunk(
  "fetchPortfolioData",
  async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data.data.market_cap_percentage);
      return data.data.market_cap_percentage;
    } catch (err) {
      return Promise.reject("Failed to fetch portfolio data");
    }
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
        state.marketCapData = action.payload;
        state.status = "idle";
      })
      .addCase(fetchPortfolioData.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      });
  },
});

export default portfolioSlice.reducer;
