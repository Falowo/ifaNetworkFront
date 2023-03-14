import React from "react";
import { pages } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

export default function ClassicPage() {
  const { pageIndex } = useParams();
  const page = pages[parseInt(pageIndex || "0")];
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h1>{page}</h1>
      <AddCircle
        sx={{
          alignSelf: "end",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        fontSize="large"
        color="success"
        onClick={()=>navigate(`/editor/page/${pageIndex}`)}
      />
    </Box>
  );
}
