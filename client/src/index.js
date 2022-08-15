import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "bootstrap/dist/js/bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/UserContext";
import {theme} from "./theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <ChakraProvider resetCSS theme={ theme }>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </BrowserRouter>
);
