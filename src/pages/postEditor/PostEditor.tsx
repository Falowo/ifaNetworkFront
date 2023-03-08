import React, { useRef } from "react";

import { useTheme } from "@mui/material/styles";

import "./postEditor.css";
import { Box } from "@mui/material";
import UploadImage from "../../components/uploadImage/UploadImage";
// import DraftJsEditor from "../../components/draftJsEditor/DraftJsEditor";

export default function MyEditor() {
  const theme = useTheme();

  const titleRef = useRef(null);

  return (
    <div className="myEditor">
      <input
        type="text"
        ref={titleRef}
        className="titleInput"
        placeholder="Choose a title for your post"
        style={{
          border: `1px solid ${theme.palette.divider}`,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexRaw: "noRaw",
          justifyContent: "space-around",
          m: 0,
        }}
      >
        <UploadImage />
      </Box>

      {/* <DraftJsEditor/> */}
    </div>
  );
}
