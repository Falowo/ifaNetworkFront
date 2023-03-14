import React, { useEffect, useState } from "react";
import {
  useAppDispatch,
  // useAppSelector,
} from "./app/hooks";
import "./App.css";
import { Box, Paper } from "@mui/material";
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
import { getOrCreateUserDBSecureAsync } from "./app/slices/authSlice";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Profile from "./pages/profile/Profile";
import Links from "./pages/links/Links";
import Messenger from "./pages/messenger/Messenger";
import MyAccount from "./pages/myAccount/MyAccount";
import PostEditor from "./pages/postEditor/PostEditor";
import ClassicPage from "./components/classicPages/ClassicPage";
// import { getPublicRequest } from "./api/auth.api";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const pages: string[] = [
  "Ifa",
  "Oshun/Egbe",
  "Readings",
];

function App() {
  const {
    user,
    isAuthenticated,
    // isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState<
    string | undefined
  >();
  const dispatch = useAppDispatch();

  useEffect(() => {
    !!isAuthenticated &&
      (async () => {
        try {
          const audience =
            process.env.REACT_APP_API_AUDIENCE;

          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: audience, // Value in Identifier field for the API being called.
              scope: "read:posts",
            },
          });

          setAccessToken(accessToken);
          !!user &&
            dispatch(
              getOrCreateUserDBSecureAsync({
                authUser: user,
                accessToken,
              }),
            );
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
      <Box
        sx={{
          m: 0,
          p: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TopBar />
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              lg: "60%",
              xl: "50%",
            },
            mx: "auto",
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: {
                xs: 1,
                md: 3,
              },
            }}
            className="paper"
          >
            <Routes>
              <Route path="/" element={<OponIfa />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/odu_room/:binId"
                element={<OponIfa />}
              />

              {pages.map((p) => (
                <Route
                  key={p}
                  path={`/${p.toLowerCase()}/:pageIndex`}
                  element={<ClassicPage />}
                />
              ))}

              <Route path={`/shop`} element={<Shop />} />
              <Route
                path={`/profile`}
                element={<Profile />}
              />
              <Route
                path={`/my_account`}
                element={<MyAccount />}
              />
              <Route
                path={`/messenger`}
                element={<Messenger />}
              />
              <Route path={`/links`} element={<Links />} />
              <Route
                path={`/editor/page/:pageId`}
                element={<PostEditor />}
              />
              <Route
                path={`/editor/odu/:binId`}
                element={<PostEditor />}
              />
              <Route
                path={`/editor/edit/:postId`}
                element={<PostEditor />}
              />

              <Route path="/*" element={<Home />} />
            </Routes>
          </Paper>

          <BottomNav />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
