import React from "react";
import { pages } from "../../App";
import "./page2.css";

export default function Page2() {
  return (
    <div>
      <h1>{pages[2]}</h1>
      <p className="one">one</p>
      <p className="two">two</p>
      <p className="three">three</p>
      <p className="four">four</p>
      <p className="five">five</p>
      <p className="six">six</p>
      <p className="seven">seven</p>
      <p className="eight">eight</p>
    </div>
  );
}
