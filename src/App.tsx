import React from "react";

import "./App.css";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Ifa from "./features/ifa/Ifa";
import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        style={{ backgroundColor: "black" }}
      >
        <Routes>
          <Route path="/" element={<Ifa />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
