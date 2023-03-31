import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { MainWindow } from "./MainWindow";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <MainWindow />
    </StyledEngineProvider>
  </React.StrictMode>
);
