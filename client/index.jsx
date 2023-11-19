import React from "react";
import ReactDOM from "react-dom/client";
import "./application.css";
import { BrowserRouter } from "react-router-dom";
import { Application } from "./components/application/application";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
