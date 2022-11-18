import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShiftContextProvider } from "./context/shiftContext.js";
import { CurrentShiftContextProvider } from "./context/currentShiftCtx";
import { UserContextProvider } from "./context/userContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(process.env.REACT_APP_API_KEY);
console.log(process.env);
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
