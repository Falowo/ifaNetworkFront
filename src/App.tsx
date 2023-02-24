import React, { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import "./App.css";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import OponIfa from "./pages/oponIfa/OponIfa";
import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./components/topBar/TopBar";
import { setToken } from "./app/slices/authSlice";
import Callback from "./pages/callback/Callback";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // !isAuthenticated && dispatch(setToken(undefined));
    !!isAuthenticated && console.log({ isAuthenticated });

    !!isAuthenticated && (async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE, // Value in Identifier field for the API being called.
            // scope: "read:posts", // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
          },
        });
        setToken(token);
        console.log({ token });
      } catch (e) {
        console.log({ e });
        console.log("autorisation Params for token failed");
      }
    })();
  }, [dispatch, getAccessTokenSilently, isAuthenticated]);

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
          <Route path="/callback" element={<Callback />} />
          <Route path="/*" element={<OponIfa />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
