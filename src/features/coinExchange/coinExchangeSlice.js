import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
import { fetchFromUrl } from "../../services/fetchFromUrl";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

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
    const url = `${BASE_URL}exchange_rates?${API_KEY_TYPE}=${API_KEY}`;
    return await fetchFromUrl(url);
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
