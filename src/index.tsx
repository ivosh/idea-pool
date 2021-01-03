import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import { greenTheme } from "./themes/greenTheme";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={greenTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
