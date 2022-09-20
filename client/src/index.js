import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShiftContextProvider } from "./context/shiftContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShiftContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ShiftContextProvider>
);
