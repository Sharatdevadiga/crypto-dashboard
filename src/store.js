import { configureStore } from "@reduxjs/toolkit";
import coinExchangeReducer from "./features/coinExchange/coinExchangeSlice";
import coinDropdownReducer from "./features/coinDropdown/coinDropdownSlice";

const store = configureStore({
  reducer: {
    coinExchange: coinExchangeReducer,
    coinDropdown: coinDropdownReducer,
  },
});

export default store;
