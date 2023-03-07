import React from "react";
import { pages } from "../../App";
import PostEditor from "../postEditor/PostEditor";

export default function Page1() {
  return (
    <div>
      <h1> {pages[1]}</h1>
      <PostEditor />
    </div>
  );
}
