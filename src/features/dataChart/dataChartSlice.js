import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentDayAtTimeInUnix,
  getDateFromPeriodInUnix,
} from "../../utils/helpers";

const initialState = {
  chartType: "line",
  selectedCrypto: [],
  fromDate: getDateFromPeriodInUnix("6M"),
  toDate: getCurrentDayAtTimeInUnix(1),
  status: "idle",
  error: "null",
  chartData: {},
};

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
});

export const { setChartType, setSelectedCrypto, setFromDate, setToDate } =
  dataChartSlice.actions;

export default dataChartSlice.reducer;
