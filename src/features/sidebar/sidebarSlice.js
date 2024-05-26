import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_KEY = "CG-WBiAUmyhrtqMvAUk27pVsTaj";

const initialState = {
  cryptoData: [],
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk(
  "sidebar/fetchData",
  async (baseCurrency) => {
    console.log(baseCurrency);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=10&page=1&x_cg_demo_api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
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
