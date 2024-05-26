import { configureStore } from "@reduxjs/toolkit";
import coinExchangeReducer from "./features/coinExchange/coinExchangeSlice";
import coinDropdownReducer from "./features/coinDropdown/coinDropdownSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import portfolioReducer from "./features/portfolio/portfolioSlice";

const store = configureStore({
  reducer: {
    coinExchange: coinExchangeReducer,
    coinDropdown: coinDropdownReducer,
    sidebar: sidebarReducer,
    portfolio: portfolioReducer,
  },
});

export default store;
