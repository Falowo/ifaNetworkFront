import React, { useEffect } from "react";
import // useAppDispatch,
// useAppSelector,
"./app/hooks";
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
import // selectToken,
// setToken,
// tryTheRequestAndDbAsync,
"./app/slices/authSlice";
import Callback from "./pages/callback/Callback";
// import { getPublicRequest } from "./api/auth.api";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const {
    isAuthenticated,
    // isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    !!isAuthenticated &&
      (async () => {
        try {
          const audience =
            process.env.REACT_APP_API_AUDIENCE;
          console.log(audience);

          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience, // Value in Identifier field for the API being called.
              scope: undefined, // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
            },
          });

          // const response = await fetch(
          //   `${process.env.REACT_APP_API_URL}private/auth/req`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   },
          // );
          // // console.log(await response.json());
          console.log(token);
        } catch (e) {
          console.error(e);
        }
      })();
  }, [getAccessTokenSilently, isAuthenticated]);

  // const dispatch = useAppDispatch();

  // const accessToken = useAppSelector(selectToken);

  // useEffect(() => {
  //   !isAuthenticated &&
  //     !isLoading &&
  //     dispatch(setToken(undefined));
  //   !!isAuthenticated && console.log({ isAuthenticated });

  //   const getAccessTokenCallable = async () => {
  //     try {
  //       const token = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: process.env.REACT_APP_AUDIENCE, // Value in Identifier field for the API being called.
  //           // scope: "read:posts", // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
  //         },
  //       });
  //       // dispatch(setToken(token));
  //       console.log({ token });
  //       const privateR = await getPublicRequest(token);
  //       const privateD = privateR.data;
  //       console.log({privateD});

  //     } catch (e) {
  //       console.log({ e });
  //       console.log("autorisation Params for token failed");
  //     }
  //   };

  //   !!isAuthenticated &&
  //     !isLoading &&
  //     getAccessTokenCallable();
  // }, [
  //   dispatch,
  //   getAccessTokenSilently,
  //   isAuthenticated,
  //   isLoading,
  // ]);

  // useEffect(() => {
  //   console.log({ accessToken });

  //   // !!accessToken &&
  //   //   dispatch(
  //   //     tryTheRequestAndDbAsync("tryTheRequestAndDbAsync"),
  //   //   );
  // }, [accessToken, dispatch]);

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
