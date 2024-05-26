import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "CG-WBiAUmyhrtqMvAUk27pVsTaj";

const initialState = {
  coins: [],
  status: "",
  error: "",
};

export const fetchCoins = createAsyncThunk(
  "fetchCoins",

  async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/supported_vs_currencies?x_cg_demo_api_key=${API_KEY}`,
    );
    const data = await response.json();
    return { data };
  },
);

const coinDropDownSlice = createSlice({
  name: "coinDropDown",
  initialState: initialState,
  reducers: {},
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
      .addCase(fetchCoins.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      });
  },
});

// export const {} = coinDropDownSlice.actions;
export default coinDropDownSlice.reducer;
