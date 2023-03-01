import * as React from "react";
import Box from "@mui/material/Box";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Paper } from "@mui/material";

export default function ClassicPage(props: {
  page: string;
}) {
  const page = props.page;
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "80%", lg: "60%" },
        ml: { xs: 0, sm: "12%", lg: "16%" },
        mr: { xs: 0, sm: "12%", lg: "16%" },
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 1, md: 3 } }}>
      
      </Paper>
    </Box>
  );
}
