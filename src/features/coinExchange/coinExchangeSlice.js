import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "CG-WBiAUmyhrtqMvAUk27pVsTaj";

const initialState = {
  fromCoin: "btc",
  toCoin: "eth",
  coinCount: "",
  rates: "",
  convertedVal: "",
  state: "",
  error: "",
};

export const fetchExchangeRate = createAsyncThunk(
  "fetchExchangeRate",
  async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/exchange_rates?x_cg_demo_api_key=${API_KEY}`,
    );

    if (!response.ok) throw new Error("Failed to fetch exchange rate");

    const data = await response.json();
    return data;
  },
);

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
