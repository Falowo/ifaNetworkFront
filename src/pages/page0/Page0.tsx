import React from "react";
import { pages } from "../../App";
import ClassicPage from "../../components/classicPages/ClassicPage";

export default function Page0() {
  const page = pages[0];
  return <ClassicPage page={page}/>;
}
