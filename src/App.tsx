import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "./app/hooks";
import "./App.css";
import { Box, Container, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import OponIfa from "./pages/oponIfa/OponIfa";
import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./components/topBar/TopBar";
import BottomNav from "./components/bottomNav/BottomNav";
import {
  getOrCreateUserDBSecureAsync,
  selectToken,
  setToken,
  // tryTheRequestAndDbAsync,
} from "./app/slices/authSlice";
import Home from "./pages/home/Home";
import OduRoom from "./pages/oduRoom/OduRoom";
import Page0 from "./pages/page0/Page0";
import Page1 from "./pages/page1/Page1";
import Page2 from "./pages/page2/Page2";
import Shop from "./pages/shop/Shop";
import Profile from "./pages/profile/Profile";
import Links from "./pages/links/Links";
import Messenger from "./pages/messenger/Messenger";
import MyAccount from "./pages/myAccount/MyAccount";
// import { getPublicRequest } from "./api/auth.api";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const pages = ["Ifa", "Oshun", "Readings"];

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

          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: audience, // Value in Identifier field for the API being called.
              scope: "read:posts",
            },
          });

          dispatch(setToken(token));
          !!user &&
            dispatch(getOrCreateUserDBSecureAsync(user));
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
      >
        <TopBar />
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", lg: "60%" },
            mx: { xs:"0", sm: "12%", lg: "16%" },
          }}
        >
          <Paper elevation={3} sx={{ p: { xs: 1, md: 3 } }}>
            <Routes>
              <Route path="/" element={<OponIfa />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/oduRoom"
                element={<OduRoom />}
              />
              <Route
                path={`/${pages[0].toLowerCase()}`}
                element={<Page0 />}
              />
              <Route
                path={`/${pages[1].toLowerCase()}`}
                element={<Page1 />}
              />
              <Route
                path={`/${pages[2].toLowerCase()}`}
                element={<Page2 />}
              />
              <Route path={`/shop`} element={<Shop />} />
              <Route
                path={`/profile`}
                element={<Profile />}
              />
              <Route
                path={`/myAccount`}
                element={<MyAccount />}
              />
              <Route
                path={`/messenger`}
                element={<Messenger />}
              />
              <Route path={`/links`} element={<Links />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </Paper>

          <BottomNav />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
