import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/index.tsx";
import "./App.css";
import { Box } from "@material-ui/core";

function App() {
  return (
    <Box className="App">
      <ToastContainer />
      <AppRoutes />
    </Box>
  );
}

export default App;
