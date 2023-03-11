import React, { useRef } from "react";

import { useTheme } from "@mui/material/styles";

import "./postEditor.css";

export default function MyEditor() {
  const theme = useTheme();

  const titleRef = useRef(null);

  return (
    <input
      type="text"
      ref={titleRef}
      className="titleInput"
      placeholder="Choose a title for your post"
      style={{
        border: `1px solid ${theme.palette.divider}`,
        color: "inherit",
        backgroundColor: "inherit",
      }}
    />
  );
}
