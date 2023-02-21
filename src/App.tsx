import React from "react";

import "./App.css";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import OponIfa from "./pages/oponIfa/OponIfa";
import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./components/topBar/TopBar";
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
        <TopBar />
        <Routes>
          <Route path="/" element={<OponIfa />} />
          <Route path="/confidential-rules" element={<OponIfa />} />
          <Route path="/*" element={<OponIfa />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
