import * as React from "react";
import Box from "@mui/material/Box";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";
import Baba from "./images/babaFatoogunBabalola.jpg";
import OponIfa from "./images/opon-ifa.jpg";

export default function ClassicPage(props: {
  page: string;
}) {
  const page = props.page;
  return (
   
      <>
        <Typography variant="h1" gutterBottom={false}>
          {page}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quos blanditiis tenetur
          subtitle1. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quos blanditiis tenetur
          subtitle1. Lorem ipsum dolor sit amet, consectetur
        </Typography>
        <img
          src={OponIfa}
          alt="Baba Fatoogun Babalola"
          style={{
            width: "100%",
          }}
        />
        <Typography
            variant="caption"
            display="block"
            gutterBottom
          >
            Ifa tray with odù Oyeku Meji printed on iyerosun
          </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quos blanditiis tenetur unde
          suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos
          laborum fugiat deleniti? Eum quasi quidem
          quibusdam.
          body1. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quos blanditiis tenetur unde
          suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos
          laborum fugiat deleniti? Eum quasi quidem
          quibusdam.
        </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Heading
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quos blanditiis tenetur unde
          suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos
          laborum fugiat deleniti? Eum quasi quidem
          quibusdam.
        </Typography>
        <Typography variant="h3" gutterBottom>
          h3. Heading
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quos blanditiis tenetur unde
          suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos
          laborum fugiat deleniti? Eum quasi quidem
          quibusdam.
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src={Baba}
            alt="Baba Fatoogun Babalola"
            style={{ width: "100%" }}
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
          >
            Babaalawo Baba Fatoogun, Otun awo Ilobu
            1959-2012
          </Typography>
        </Box>
        </>
  );
}
