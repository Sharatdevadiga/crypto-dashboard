import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_KEY = "CG-WBiAUmyhrtqMvAUk27pVsTaj";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk("sidebar/fetchData", async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=${API_KEY}`,
  );
  const data = await response.json();
  console.log(data);
  return data;
});

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.error = "Failed to load data";
      });
  },
});

export default sideBarSlice.reducer;
