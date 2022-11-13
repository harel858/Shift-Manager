import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShiftContextProvider } from "./context/shiftContext.js";
import { UserContextProvider } from "./context/userContext.js";
import { CurrentShiftContextProvider } from "./context/currentShiftContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <CurrentShiftContextProvider>
      <ShiftContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ShiftContextProvider>
    </CurrentShiftContextProvider>
  </UserContextProvider>
);
