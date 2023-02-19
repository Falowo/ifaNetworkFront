"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./oponIfa.css");
var square_opon_ifa_black_jpg_1 = require("./square-opon-ifa-black.jpg");
var material_1 = require("@mui/material");
var timeago = require("timeago.js");
var icons_material_1 = require("@mui/icons-material");
var material_2 = require("@mui/material");
var hooks_1 = require("../../app/hooks");
var ifaSlice_1 = require("../../app/slices/ifaSlice");
var IsNotAsking_1 = require("../../components/oponIfaMods/IsNotAsking");
var IsAsking_1 = require("../../components/oponIfaMods/IsAsking");
function OponIfa() {
    var _a;
    var _b = react_1.useState(false), isAsking = _b[0], setIsAsking = _b[1];
    var dispatch = hooks_1.useAppDispatch();
    // const currentOdu = useAppSelector(selectCurrentOdu);
    var indexCurrentOdu = hooks_1.useAppSelector(ifaSlice_1.selectIndexCurrentOdu);
    var indexCurrentQuestion = hooks_1.useAppSelector(ifaSlice_1.selectIndexCurrentQuestion);
    var oduHistory = hooks_1.useAppSelector(ifaSlice_1.selectOduHistory);
    var currentOdu = oduHistory[indexCurrentOdu];
    return (react_1["default"].createElement(material_1.Container, { maxWidth: "lg", sx: {
            margin: "0 auto !important",
            padding: "0 auto !important"
        } },
        !isAsking ? (react_1["default"].createElement(material_1.Box, { sx: {
                display: "flex",
                flexDirection: "column",
                paddingBottom: "5px"
            } },
            react_1["default"].createElement("h1", { className: "oduNameTitle", style: {
                    textAlign: "center",
                    color: "" + (!!(currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.randomColor)
                        ? "#" + currentOdu.randomColor
                        : "white")
                } }, !!((_a = currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.oduNames) === null || _a === void 0 ? void 0 : _a.length)
                ? currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.oduNames[0] : "e-opele"),
            react_1["default"].createElement("span", { className: "spanTimeAgo", style: {
                    color: !!(currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.randomColor)
                        ? "" + ("#" + (currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.randomColor))
                        : "white"
                } }, !!(currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.createdAt) &&
                timeago.format(currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.createdAt)))) : (react_1["default"].createElement(material_2.Input, { sx: {
                flexGrow: "1"
            }, autoFocus: true, placeholder: "Write your binary question or formalize it" })),
        react_1["default"].createElement("div", { style: {
                display: "flex",
                flexFlow: "row-reverse",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                //   padding: "5px",
                alignItems: "center",
                border: "solid 3px red"
            } },
            !isAsking ? (react_1["default"].createElement(icons_material_1.QuestionMark, { onClick: function (e) {
                    e.stopPropagation();
                    setIsAsking(true);
                }, sx: {
                    fontSize: "3rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    margin: "16px",
                    minWidth: "64px",
                    minHeight: "64px"
                } })) : (react_1["default"].createElement(icons_material_1.MeetingRoom, { onClick: function (e) {
                    e.stopPropagation();
                    setIsAsking(false);
                }, sx: {
                    fontSize: "3rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    margin: "16px",
                    minWidth: "64px",
                    minHeight: "64px"
                } })),
            react_1["default"].createElement(icons_material_1.PlayArrow, { onClick: function (e) {
                    e.stopPropagation();
                    if (!isAsking) {
                        dispatch(ifaSlice_1.castOdu());
                    }
                    else {
                        dispatch(ifaSlice_1.askQuestionAsync({ ibo: true }));
                    }
                }, sx: {
                    fontSize: "3rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    margin: "16px",
                    minWidth: "64px",
                    minHeight: "64px"
                } }),
            react_1["default"].createElement("div", { style: {
                    minWidth: "64px",
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center"
                } },
                !!isAsking && indexCurrentQuestion !== 0 ? (react_1["default"].createElement(icons_material_1.Cached, { onClick: function (e) {
                        e.stopPropagation();
                        dispatch(ifaSlice_1.initializeIndexCurrentQuestion());
                    }, sx: {
                        fontSize: "3rem",
                        fontWeight: "bolder",
                        cursor: "pointer",
                        margin: "16px",
                        minWidth: "64px",
                        minHeight: "64px"
                    } })) : !isAsking && indexCurrentOdu !== 0 ? (react_1["default"].createElement(icons_material_1.Cached, { onClick: function (e) {
                        e.stopPropagation();
                        dispatch(ifaSlice_1.blankTrail());
                    }, sx: {
                        fontSize: "3rem",
                        fontWeight: "bolder",
                        cursor: "pointer",
                        margin: "16px",
                        minWidth: "64px",
                        minHeight: "64px"
                    } })) : null,
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(icons_material_1.SkipPrevious, { onClick: function (e) {
                            e.stopPropagation();
                            if (!!isAsking) {
                                dispatch(ifaSlice_1.incrementIndexCurrentQuestion());
                            }
                            else {
                                dispatch(ifaSlice_1.incrementIndexCurrentOdu());
                            }
                        }, sx: {
                            fontSize: "3rem",
                            fontWeight: "bolder",
                            cursor: "pointer",
                            margin: "16px",
                            minWidth: "64px",
                            minHeight: "64px"
                        } }),
                    react_1["default"].createElement(icons_material_1.SkipNext, { onClick: function (e) {
                            e.stopPropagation();
                            if (!!isAsking) {
                                dispatch(ifaSlice_1.decrementIndexCurrentQuestion());
                            }
                            else {
                                dispatch(ifaSlice_1.decrementIndexCurrentOdu());
                            }
                        }, sx: {
                            fontSize: "3rem",
                            fontWeight: "bolder",
                            cursor: "pointer",
                            margin: "16px",
                            minWidth: "64px",
                            minHeight: "64px"
                        } })))),
        react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "divImageOpon", onClick: function (e) {
                    e.stopPropagation();
                    if (!isAsking) {
                        dispatch(ifaSlice_1.castOdu());
                    }
                    else {
                        dispatch(ifaSlice_1.askQuestionAsync({ ibo: true }));
                    }
                }, style: { cursor: "pointer" } },
                react_1["default"].createElement("img", { className: "imageOpon", src: square_opon_ifa_black_jpg_1["default"], alt: "Opon Ifa" }),
                react_1["default"].createElement(material_1.Box, { className: "boxOponIfaMods", sx: { border: "solid 2px hotpink" } }, !isAsking ? react_1["default"].createElement(IsNotAsking_1["default"], null) : react_1["default"].createElement(IsAsking_1["default"], null))))));
}
exports["default"] = OponIfa;
