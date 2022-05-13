import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ToastProvider
    autoDismiss={true}
    autoDismissTimeout={3000}
    placement="top-right"
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ToastProvider>
);
