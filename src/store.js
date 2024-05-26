import { configureStore } from "@reduxjs/toolkit";
import coinExchangeReducer from "./features/coinExchange/coinExchangeSlice";
import coinDropdownReducer from "./features/coinDropdown/coinDropdownSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";

const store = configureStore({
  reducer: {
    coinExchange: coinExchangeReducer,
    coinDropdown: coinDropdownReducer,
    sidebar: sidebarReducer,
  },
});

export default store;
