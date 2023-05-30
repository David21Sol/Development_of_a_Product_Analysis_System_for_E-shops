import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//routes
import { BrowserRouter } from "react-router-dom";
//redux-Provider
import { Provider } from "react-redux";

//redux
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
