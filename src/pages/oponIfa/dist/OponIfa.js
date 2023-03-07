"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./oponIfa.css");
var square_opon_ifa_black_jpg_1 = require("./square-opon-ifa-black.jpg");
var react_router_dom_1 = require("react-router-dom");
var auth0_react_1 = require("@auth0/auth0-react");
var material_1 = require("@mui/material");
var timeago = require("timeago.js");
var icons_material_1 = require("@mui/icons-material");
var hooks_1 = require("../../app/hooks");
var ifaSlice_1 = require("../../app/slices/ifaSlice");
var IsNotAsking_1 = require("../../components/oponIfaMods/IsNotAsking");
var IsAsking_1 = require("../../components/oponIfaMods/IsAsking");
function OponIfa() {
    var _a;
    var navigate = react_router_dom_1.useNavigate();
    var _b = auth0_react_1.useAuth0(), isAuthenticated = _b.isAuthenticated, user = _b.user;
    var _c = react_1.useState(false), isAsking = _c[0], setIsAsking = _c[1];
    var _d = react_1.useState(false), isDivinationMode = _d[0], setIsDivinationMode = _d[1];
    var dispatch = hooks_1.useAppDispatch();
    // const currentOdu = useAppSelector(selectCurrentOdu);
    var inputEl = react_1.useRef(null);
    var indexCurrentOdu = hooks_1.useAppSelector(ifaSlice_1.selectIndexCurrentOdu);
    var indexCurrentQuestion = hooks_1.useAppSelector(ifaSlice_1.selectIndexCurrentQuestion);
    var oduHistory = hooks_1.useAppSelector(ifaSlice_1.selectOduHistory);
    var questionHistory = hooks_1.useAppSelector(ifaSlice_1.selectQuestionHistory);
    var currentOdu = oduHistory[indexCurrentOdu];
    var _e = react_1.useState(undefined), colorSkipNextCommand = _e[0], setSkipNextColorCommand = _e[1];
    var _f = react_1.useState(undefined), colorSkipPreviousCommand = _f[0], setSkipPreviousColorCommand = _f[1];
    var skipPreviousOnClick = function (e) {
        e.stopPropagation();
        if (!!isAsking &&
            indexCurrentQuestion !== questionHistory.length - 1 &&
            questionHistory.length > 1) {
            dispatch(ifaSlice_1.incrementIndexCurrentQuestion());
        }
        else if (!isAsking &&
            indexCurrentOdu !== oduHistory.length - 1 &&
            oduHistory.length > 1) {
            dispatch(ifaSlice_1.incrementIndexCurrentOdu());
        }
        else {
            console.log("lastSSp");
        }
    };
    var skipNextOnClick = function (e) {
        e.stopPropagation();
        if (!!isAsking && indexCurrentQuestion !== 0) {
            dispatch(ifaSlice_1.decrementIndexCurrentQuestion());
        }
        else if (!isAsking && indexCurrentOdu !== 0) {
            dispatch(ifaSlice_1.decrementIndexCurrentOdu());
        }
        else {
            console.log("lastSF");
        }
    };
    react_1.useEffect(function () {
        if (!isAsking) {
            if (indexCurrentOdu === 0) {
                setSkipNextColorCommand("disabled");
                if (oduHistory.length <= 1) {
                    setSkipPreviousColorCommand("disabled");
                }
                else {
                    setSkipPreviousColorCommand(undefined);
                }
            }
            else if (indexCurrentOdu ===
                oduHistory.length - 1) {
                setSkipPreviousColorCommand("disabled");
                if (indexCurrentOdu !== 0) {
                    setSkipNextColorCommand(undefined);
                }
            }
            else {
                setSkipNextColorCommand(undefined);
                setSkipPreviousColorCommand(undefined);
            }
        }
        if (!!isAsking) {
            if (indexCurrentQuestion === 0) {
                setSkipNextColorCommand("disabled");
                if (questionHistory.length <= 1) {
                    setSkipPreviousColorCommand("disabled");
                }
                else {
                    setSkipPreviousColorCommand(undefined);
                }
            }
            else if (indexCurrentQuestion ===
                questionHistory.length - 1) {
                setSkipPreviousColorCommand("disabled");
                if (indexCurrentQuestion !== 0) {
                    setSkipNextColorCommand(undefined);
                }
            }
            else {
                setSkipNextColorCommand(undefined);
                setSkipPreviousColorCommand(undefined);
            }
        }
    }, [
        indexCurrentOdu,
        indexCurrentQuestion,
        isAsking,
        oduHistory.length,
        questionHistory.length,
    ]);
    react_1.useEffect(function () {
        var _a;
        isAsking && ((_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.focus());
    }, [isAsking]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Box, { sx: {
                display: "flex",
                justifyContent: "flex-end"
            } },
            react_1["default"].createElement(material_1.FormGroup, null,
                react_1["default"].createElement(material_1.Stack, { direction: "row", spacing: 1, alignItems: "center" },
                    react_1["default"].createElement(material_1.Typography, { sx: { size: "small" } }, "Study"),
                    react_1["default"].createElement(material_1.Switch, { checked: isDivinationMode, onChange: function () {
                            return setIsDivinationMode(!isDivinationMode);
                        }, "aria-label": "isAsking switch", color: "warning", disabled: !isAuthenticated ||
                            ((user === null || user === void 0 ? void 0 : user.name) !==
                                "Josselin Falowo Krikorian" &&
                                (user === null || user === void 0 ? void 0 : user.name) !== "Falowo Orisatola") }),
                    react_1["default"].createElement(material_1.Typography, null, "Divination")))),
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
                timeago.format(currentOdu === null || currentOdu === void 0 ? void 0 : currentOdu.createdAt)))) : (react_1["default"].createElement("form", null,
            react_1["default"].createElement("input", { style: { width: "100%", padding: "8px" }, autoFocus: false, placeholder: "Write your binary question or formalize it", ref: inputEl, type: "text", onKeyDownCapture: function (e) {
                    var _a;
                    console.log("onKeyDownCapture");
                    if (e.key === "Enter") {
                        var question = (_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.value;
                        console.log("Enter");
                        dispatch(ifaSlice_1.askQuestionAsync({
                            ibo: true,
                            question: question
                        }));
                    }
                } }))),
        react_1["default"].createElement("div", { style: {
                display: "flex",
                flexFlow: "row-reverse",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "center"
            } },
            !!isAsking ? (react_1["default"].createElement(icons_material_1.QuestionMark, { sx: {
                    fontSize: "1.5rem",
                    //   fontWeight: "bolder",
                    cursor: "pointer",
                    margin: "8px",
                    minWidth: "32px",
                    minHeight: "32px",
                    display: "none"
                } })) : (react_1["default"].createElement(icons_material_1.MeetingRoom, { onClick: function (e) {
                    e.stopPropagation();
                    console.log("go room");
                    navigate("/odu_room/" + currentOdu.binId);
                }, sx: {
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    margin: "8px",
                    minWidth: "32px",
                    minHeight: "32px"
                } })),
            react_1["default"].createElement(icons_material_1.PlayArrow, { onClick: function (e) {
                    var _a, _b;
                    e.stopPropagation();
                    if (!isAsking) {
                        dispatch(ifaSlice_1.castOdu());
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        var question = (_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.value;
                        dispatch(ifaSlice_1.askQuestionAsync({
                            ibo: true,
                            question: question
                        }));
                        if (!!((_b = inputEl === null || inputEl === void 0 ? void 0 : inputEl.current) === null || _b === void 0 ? void 0 : _b.value)) {
                            inputEl.current.value = "";
                        }
                    }
                }, sx: {
                    fontSize: "1.5rem",
                    //   fontWeight: "bolder",
                    cursor: "pointer",
                    margin: "8px",
                    minWidth: "32px",
                    minHeight: "32px"
                } }),
            react_1["default"].createElement("div", { style: {
                    minWidth: "8px",
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center"
                } }, react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(icons_material_1.SkipPrevious, { onClick: function (e) { return skipPreviousOnClick(e); }, sx: {
                        fontSize: "1.5rem",
                        // fontWeight: "bolder",
                        cursor: "pointer",
                        margin: "8px",
                        minWidth: "32px",
                        minHeight: "32px"
                    }, color: colorSkipPreviousCommand }),
                react_1["default"].createElement(icons_material_1.SkipNext, { onClick: function (e) { return skipNextOnClick(e); }, sx: {
                        fontSize: "1.5rem",
                        // fontWeight: "bolder",
                        cursor: "pointer",
                        margin: "8px",
                        minWidth: "32px",
                        minHeight: "32px"
                    }, color: colorSkipNextCommand })))),
        react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "divImageOpon", onClick: function (e) {
                    var _a, _b;
                    e.stopPropagation();
                    if (!isAsking) {
                        dispatch(ifaSlice_1.castOdu());
                    }
                    else {
                        var question = (_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.value;
                        dispatch(ifaSlice_1.askQuestionAsync({ ibo: true, question: question }));
                        if (!!((_b = inputEl === null || inputEl === void 0 ? void 0 : inputEl.current) === null || _b === void 0 ? void 0 : _b.value)) {
                            inputEl.current.value = "";
                        }
                    }
                }, style: { cursor: "pointer" } },
                react_1["default"].createElement("img", { className: "imageOpon", src: square_opon_ifa_black_jpg_1["default"], alt: "Opon Ifa" }),
                react_1["default"].createElement(material_1.Box, { className: "boxOponIfaMods" }, !isAsking ? (react_1["default"].createElement(IsNotAsking_1["default"], { isDivinationMode: isDivinationMode })) : (react_1["default"].createElement(IsAsking_1["default"], null)))),
            react_1["default"].createElement(material_1.Box, { sx: {
                    display: "flex",
                    justifyContent: "flex-end"
                } },
                react_1["default"].createElement(material_1.FormGroup, null,
                    react_1["default"].createElement(material_1.FormControlLabel, { control: react_1["default"].createElement(material_1.Switch, { checked: isAsking, onChange: function () { return setIsAsking(!isAsking); }, "aria-label": "isAsking switch" }), label: "?" }))))));
}
exports["default"] = OponIfa;
