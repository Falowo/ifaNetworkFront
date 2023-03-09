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
var authSlice_1 = require("../../app/slices/authSlice");
var IsNotAsking_1 = require("../../components/oponIfaMods/IsNotAsking");
var IsAsking_1 = require("../../components/oponIfaMods/IsAsking");
var styles_1 = require("@mui/material/styles");
var colors_1 = require("@mui/material/colors");
var DeepPurpleSwitch = styles_1.styled(material_1.Switch)(function (_a) {
    var theme = _a.theme;
    return ({
        "& .MuiSwitch-switchBase.Mui-checked": {
            color: colors_1.deepPurple["A400"],
            "&:hover": {
                backgroundColor: styles_1.alpha(colors_1.deepPurple["A400"], theme.palette.action.hoverOpacity)
            }
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: colors_1.deepPurple["A400"]
        }
    });
});
function OponIfa() {
    var _a;
    var theme = styles_1.useTheme();
    var userDB = hooks_1.useAppSelector(authSlice_1.selectUserDB);
    var navigate = react_router_dom_1.useNavigate();
    var isAuthenticated = auth0_react_1.useAuth0().isAuthenticated;
    var _b = react_1.useState(false), isAsking = _b[0], setIsAsking = _b[1];
    var dispatch = hooks_1.useAppDispatch();
    var currentOdu = hooks_1.useAppSelector(ifaSlice_1.selectCurrentOdu);
    var inputEl = react_1.useRef(null);
    var indexCurrentOdu = hooks_1.useAppSelector(ifaSlice_1.selectIndexCurrentOdu);
    var indexCurrentQuestion = hooks_1.useAppSelector(ifaSlice_1.selectIndexCurrentQuestion);
    var oduHistory = hooks_1.useAppSelector(ifaSlice_1.selectOduHistory);
    var questionHistory = hooks_1.useAppSelector(ifaSlice_1.selectQuestionHistory);
    var isDivinationMode = hooks_1.useAppSelector(ifaSlice_1.selectIsDivinationMode);
    var _c = react_1.useState(currentOdu), odu = _c[0], setOdu = _c[1];
    react_1.useEffect(function () {
        console.log({ deepPurple: colors_1.deepPurple["A400"] });
    }, []);
    react_1.useEffect(function () {
        if (indexCurrentOdu === 0) {
            setOdu(currentOdu);
        }
        else {
            setOdu(oduHistory[indexCurrentOdu]);
        }
    }, [indexCurrentOdu, oduHistory]);
    var _d = react_1.useState(undefined), colorSkipNextCommand = _d[0], setSkipNextColorCommand = _d[1];
    var _e = react_1.useState(undefined), colorSkipPreviousCommand = _e[0], setSkipPreviousColorCommand = _e[1];
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
        isAsking && ((_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true }));
    }, [isAsking]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Box, { sx: {
                display: "flex",
                justifyContent: "flex-end"
            } },
            react_1["default"].createElement(material_1.FormGroup, null,
                react_1["default"].createElement(material_1.Stack, { direction: "row", spacing: 1, alignItems: "center" },
                    react_1["default"].createElement(material_1.Typography, { color: !isDivinationMode
                            ? "inherit"
                            : theme.palette.text.disabled }, "Study"),
                    react_1["default"].createElement(DeepPurpleSwitch, { checked: isDivinationMode, onChange: function () {
                            return dispatch(ifaSlice_1.toggleIsDivinationMode());
                        }, "aria-label": "divinationMode switch", color: "warning", disabled: process.env.NODE_ENV === "production"
                            ? !(isAuthenticated &&
                                !!(userDB === null || userDB === void 0 ? void 0 : userDB.isBabalawo))
                            : false }),
                    react_1["default"].createElement(material_1.Typography, { color: !!isDivinationMode
                            ? "inherit"
                            : theme.palette.text.disabled }, "Divination")))),
        !isAsking ? (react_1["default"].createElement(material_1.Box, { sx: {
                display: "flex",
                flexDirection: "column",
                paddingBottom: "5px"
            } },
            react_1["default"].createElement("h1", { className: "oduNameTitle", style: {
                    textAlign: "center",
                    color: "" + (!!(odu === null || odu === void 0 ? void 0 : odu.randomColor)
                        ? odu.randomColor
                        : theme.palette.text.primary)
                } }, !!((_a = odu === null || odu === void 0 ? void 0 : odu.oduNames) === null || _a === void 0 ? void 0 : _a.length)
                ? odu === null || odu === void 0 ? void 0 : odu.oduNames[0] : "e-opele"),
            react_1["default"].createElement("span", { className: "spanTimeAgo", style: {
                    color: !!(odu === null || odu === void 0 ? void 0 : odu.randomColor)
                        ? odu === null || odu === void 0 ? void 0 : odu.randomColor : theme.palette.text.primary
                } }, !!(odu === null || odu === void 0 ? void 0 : odu.createdAt) &&
                timeago.format(odu === null || odu === void 0 ? void 0 : odu.createdAt)))) : (react_1["default"].createElement("input", { style: { width: "100%", padding: "8px" }, autoFocus: false, placeholder: "Write your yes/no affirmative question or formalize it", ref: inputEl, type: "text", onKeyDownCapture: function (e) {
                var _a, _b;
                console.log("onKeyDownCapture");
                console.log(e);
                if (e.key === "Enter") {
                    var question = (_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.value;
                    console.log("Enter");
                    dispatch(ifaSlice_1.askQuestionAsync({
                        ibo: true,
                        question: question
                    }));
                    if (!!((_b = inputEl === null || inputEl === void 0 ? void 0 : inputEl.current) === null || _b === void 0 ? void 0 : _b.value)) {
                        inputEl.current.blur();
                        inputEl.current.value = "";
                    }
                }
            } })),
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
                    navigate("/odu_room/" + odu.binId);
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
                    e.preventDefault();
                    e.stopPropagation();
                    if (!isDivinationMode) {
                        if (!isAsking) {
                            dispatch(ifaSlice_1.castOdu());
                        }
                        else {
                            var question = (_a = inputEl.current) === null || _a === void 0 ? void 0 : _a.value;
                            dispatch(ifaSlice_1.askQuestionAsync({ ibo: true, question: question }));
                        }
                        if (!!((_b = inputEl === null || inputEl === void 0 ? void 0 : inputEl.current) === null || _b === void 0 ? void 0 : _b.value)) {
                            inputEl.current.value = "";
                        }
                    }
                }, style: { cursor: "pointer" } },
                react_1["default"].createElement("img", { className: "imageOpon", src: square_opon_ifa_black_jpg_1["default"], alt: "Opon Ifa" }),
                react_1["default"].createElement(material_1.Box, { className: "boxOponIfaMods" }, !isAsking || !questionHistory.length ? (react_1["default"].createElement(IsNotAsking_1["default"], { isDivinationMode: isDivinationMode })) : (react_1["default"].createElement(IsAsking_1["default"], null)))),
            react_1["default"].createElement(material_1.Box, { sx: {
                    display: "flex",
                    justifyContent: "flex-end"
                } },
                react_1["default"].createElement(material_1.Stack, { direction: "row", spacing: 1, alignItems: "center" },
                    react_1["default"].createElement(material_1.Switch, { checked: isAsking, onChange: function () { return setIsAsking(!isAsking); }, "aria-label": "isAsking switch", color: "default" }),
                    react_1["default"].createElement(material_1.Typography, { color: !!isAsking
                            ? "inherit"
                            : theme.palette.text.disabled }, "?"))))));
}
exports["default"] = OponIfa;
