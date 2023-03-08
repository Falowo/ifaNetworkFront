"use strict";
exports.__esModule = true;
var react_1 = require("react");
var App_1 = require("../../App");
require("./page2.css");
function Page2() {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, App_1.pages[2]),
        react_1["default"].createElement("p", { className: "one" })));
}
exports["default"] = Page2;
