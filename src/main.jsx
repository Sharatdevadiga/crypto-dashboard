import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import Loader from "./ui/Loader.jsx";

const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader type="fullScreen" />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
