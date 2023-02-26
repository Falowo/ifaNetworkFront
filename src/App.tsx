import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "./app/hooks";
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
import {
  getOrCreateUserDBAsync,
  selectToken,
  setToken,
  // tryTheRequestAndDbAsync,
} from "./app/slices/authSlice";
import Callback from "./pages/callback/Callback";
// import { getPublicRequest } from "./api/auth.api";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const {
    user,
    isAuthenticated,
    // isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector(selectToken);

  useEffect(() => {
    !!isAuthenticated &&
      (async () => {
        try {
          const audience =
            process.env.REACT_APP_API_AUDIENCE;
          console.log(audience);

          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: audience, // Value in Identifier field for the API being called.
              scope: "read:posts",
            },
          });

          dispatch(setToken(token));
          !!user && dispatch(getOrCreateUserDBAsync(user));
          console.log({ accessToken });
        } catch (e) {
          console.error({ e });
        }
      })();
  }, [
    accessToken,
    dispatch,
    getAccessTokenSilently,
    isAuthenticated,
    user,
  ]);

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
