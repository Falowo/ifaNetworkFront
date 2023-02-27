"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var hooks_1 = require("../../app/hooks");
var ifaSlice_1 = require("../../app/slices/ifaSlice");
function IsAsking() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
    var dispatch = hooks_1.useAppDispatch();
    var question = hooks_1.useAppSelector(ifaSlice_1.selectQuestion);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var questionHistory = hooks_1.useAppSelector(ifaSlice_1.selectQuestionHistory);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var indexCurrentQuestion = hooks_1.useAppSelector(ifaSlice_1.selectIndexCurrentQuestion);
    var textShadow = "-4px 1px #002021";
    var textShadow2 = "-1px 1px #002021";
    return (react_1["default"].createElement("div", { style: { marginTop: "10%" } },
        react_1["default"].createElement(material_1.Grid
        // className="printGrid"
        , { 
            // className="printGrid"
            container: true, spacing: 1, margin: "0 auto", width: "100%", onClick: function (e) {
                e.stopPropagation();
                dispatch(ifaSlice_1.askQuestionAsync({ ibo: true }));
            } },
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 3.5 }),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 1, style: {
                    display: "flex",
                    justifyContent: "center"
                } },
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    } }, !!questionHistory.length && ((_a = questionHistory[indexCurrentQuestion]) === null || _a === void 0 ? void 0 : _a.secondOdu) && ((_d = (_c = (_b = questionHistory[indexCurrentQuestion]) === null || _b === void 0 ? void 0 : _b.secondOdu) === null || _c === void 0 ? void 0 : _c.leg1) === null || _d === void 0 ? void 0 : _d.map(function (m, i) {
                    var _a, _b, _c, _d;
                    return (react_1["default"].createElement("h2", { key: i, className: "markItemIsAsking", style: {
                            textShadow: textShadow,
                            color: !!((_b = (_a = questionHistory[indexCurrentQuestion]) === null || _a === void 0 ? void 0 : _a.secondOdu) === null || _b === void 0 ? void 0 : _b.randomColor)
                                ? "" + ("#" + ((_d = (_c = questionHistory[indexCurrentQuestion]) === null || _c === void 0 ? void 0 : _c.secondOdu) === null || _d === void 0 ? void 0 : _d.randomColor))
                                : "white"
                        } }, m === true ? "I" : "II"));
                })))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 1 },
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    } }, !!questionHistory.length && ((_e = questionHistory[indexCurrentQuestion]) === null || _e === void 0 ? void 0 : _e.secondOdu) && ((_h = (_g = (_f = questionHistory[indexCurrentQuestion]) === null || _f === void 0 ? void 0 : _f.secondOdu) === null || _g === void 0 ? void 0 : _g.leg0) === null || _h === void 0 ? void 0 : _h.map(function (m, i) {
                    var _a, _b, _c, _d;
                    return (react_1["default"].createElement("h2", { key: i, className: "markItemIsAsking", style: {
                            textShadow: textShadow,
                            color: !!((_b = (_a = questionHistory[indexCurrentQuestion]) === null || _a === void 0 ? void 0 : _a.secondOdu) === null || _b === void 0 ? void 0 : _b.randomColor)
                                ? "" + ("#" + ((_d = (_c = questionHistory[indexCurrentQuestion]) === null || _c === void 0 ? void 0 : _c.secondOdu) === null || _d === void 0 ? void 0 : _d.randomColor))
                                : "white"
                        } }, m === true ? "I" : "II"));
                })))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 1 }),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 1 },
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    } }, !!questionHistory.length && ((_l = (_k = (_j = questionHistory[indexCurrentQuestion]) === null || _j === void 0 ? void 0 : _j.firstOdu) === null || _k === void 0 ? void 0 : _k.leg1) === null || _l === void 0 ? void 0 : _l.map(function (m, i) { return (react_1["default"].createElement("h2", { key: i, className: "markItemIsAsking", style: {
                        textShadow: textShadow,
                        color: !!questionHistory[indexCurrentQuestion].firstOdu.randomColor
                            ? "" + ("#" +
                                questionHistory[indexCurrentQuestion].firstOdu.randomColor)
                            : "white"
                    } }, m === true ? "I" : "II")); })))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 1 },
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    } }, !!questionHistory.length && ((_p = (_o = (_m = questionHistory[indexCurrentQuestion]) === null || _m === void 0 ? void 0 : _m.firstOdu) === null || _o === void 0 ? void 0 : _o.leg0) === null || _p === void 0 ? void 0 : _p.map(function (m, i) { return (react_1["default"].createElement("h2", { key: i, className: "markItemIsAsking", style: {
                        textShadow: textShadow,
                        color: !!questionHistory[indexCurrentQuestion].firstOdu.randomColor
                            ? "" + ("#" +
                                questionHistory[indexCurrentQuestion].firstOdu.randomColor)
                            : "white"
                    } }, m === true ? "I" : "II")); })))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 3.5 }),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 3.5 }),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 2, style: {
                    display: "flex",
                    justifyContent: "center"
                } }, !!((_s = (_r = (_q = questionHistory[indexCurrentQuestion]) === null || _q === void 0 ? void 0 : _q.secondOdu) === null || _r === void 0 ? void 0 : _r.oduNames) === null || _s === void 0 ? void 0 : _s.length) && (react_1["default"].createElement("span", { className: "oduQuestion", style: {
                    textShadow: textShadow2,
                    color: !!((_u = (_t = questionHistory[indexCurrentQuestion]) === null || _t === void 0 ? void 0 : _t.secondOdu) === null || _u === void 0 ? void 0 : _u.randomColor)
                        ? "" + ("#" + ((_w = (_v = questionHistory[indexCurrentQuestion]) === null || _v === void 0 ? void 0 : _v.secondOdu) === null || _w === void 0 ? void 0 : _w.randomColor))
                        : "white"
                } }, !!((_z = (_y = (_x = questionHistory[indexCurrentQuestion]) === null || _x === void 0 ? void 0 : _x.secondOdu) === null || _y === void 0 ? void 0 : _y.oduNames) === null || _z === void 0 ? void 0 : _z.length) &&
                questionHistory ? (_1 = (_0 = [indexCurrentQuestion]) === null || _0 === void 0 ? void 0 : _0.secondOdu) === null || _1 === void 0 ? void 0 : _1.oduNames[0] : ))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 1 }),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 2, style: {
                    display: "flex",
                    justifyContent: "center"
                } }, !!((_3 = (_2 = question === null || question === void 0 ? void 0 : question.firstOdu) === null || _2 === void 0 ? void 0 : _2.oduNames) === null || _3 === void 0 ? void 0 : _3.length) && (react_1["default"].createElement("span", { className: "oduQuestion", style: {
                    textShadow: textShadow2,
                    color: !!((_4 = question === null || question === void 0 ? void 0 : question.firstOdu) === null || _4 === void 0 ? void 0 : _4.randomColor)
                        ? "" + ("#" + ((_5 = question === null || question === void 0 ? void 0 : question.firstOdu) === null || _5 === void 0 ? void 0 : _5.randomColor))
                        : "white"
                } }, !!((_7 = (_6 = question === null || question === void 0 ? void 0 : question.firstOdu) === null || _6 === void 0 ? void 0 : _6.oduNames) === null || _7 === void 0 ? void 0 : _7.length) && ((_8 = question === null || question === void 0 ? void 0 : question.firstOdu) === null || _8 === void 0 ? void 0 : _8.oduNames[0])))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 3.5 }),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 4 }),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 4 }, typeof (question === null || question === void 0 ? void 0 : question.response) === "boolean" && (react_1["default"].createElement("h1", { style: {
                    textAlign: "center",
                    fontSize: "3rem",
                    fontWeight: "bold"
                } }, (_9 = question === null || question === void 0 ? void 0 : question.response) === null || _9 === void 0 ? void 0 : _9.toString()))))));
}
exports["default"] = IsAsking;
