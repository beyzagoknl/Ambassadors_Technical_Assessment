import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import { ThemeProvider } from "react-jss";
import { BrowserRouter } from "react-router-dom";

import { theme } from "./theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals(console.log);
