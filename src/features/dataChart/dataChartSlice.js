import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentHourInUnix } from "../../utils/helpers";
import { API_KEY_TYPE, BASE_URL } from "../../config/config";
import { fetchFromUrl } from "../../services/fetchFromUrl";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const initialState = {
  chartType: "line",
  selectedCrypto: ["binancecoin", "solana"],
  fromDate: "1Y",
  toDateInUnix: getCurrentHourInUnix(),
  status: "idle",
  error: null,
  chartDataFromAPI: [],
};

export const fetchChartData = createAsyncThunk(
  "fetchChartData",
  async ({ from, to, selected, baseCurrency }) => {
    try {
      const promises = selected.map(async (crypto) => {
        const url = `${BASE_URL}coins/${crypto}/market_chart/range?vs_currency=${baseCurrency}&${API_KEY_TYPE}=${API_KEY}&from=${from}&to=${to}`;

        return await fetchFromUrl(url, "history", crypto);
      });
      const results = await Promise.allSettled(promises);
      const successFulResults = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      return successFulResults;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

const dataChartSlice = createSlice({
  name: "dataChart",
  initialState,
  reducers: {
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartDataFromAPI = action.payload;
        state.status = "idle";
      })
      .addCase(fetchChartData.rejected, (state) => {
        state.status = "error";
        state.error = "Error loading data";
      });
  },
});

export const { setChartType, setSelectedCrypto, setFromDate, setToDate } =
  dataChartSlice.actions;

export default dataChartSlice.reducer;
