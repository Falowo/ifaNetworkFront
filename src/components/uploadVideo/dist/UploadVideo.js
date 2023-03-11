"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var icons_material_1 = require("@mui/icons-material");
require("./uploadVideo.css");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var placeHolderVideo1_jpg_1 = require("./videos/placeHolderVideo1.jpg");
var videoMimeType = /video\/(png|jpg|jpeg)/i;
var MAX_COUNT = 15;
function UploadVideo() {
    var theme = styles_1.useTheme();
    var _a = react_1.useState([]), uploadedVideoFiles = _a[0], setUploadedVideoFiles = _a[1];
    var _b = react_1.useState(false), videoFileLimit = _b[0], setVideoFileLimit = _b[1];
    var handleUploadVideoFiles = function (files) {
        var uploadedVideos = __spreadArrays(uploadedVideoFiles);
        var limitExceeded = false;
        files.some(function (file) {
            if (!file.type.match(videoMimeType)) {
                alert("Video mime type is not valid");
                return true;
            }
            if (uploadedVideos.findIndex(function (f) { return f.name === file.name; }) === -1) {
                uploadedVideos.push(file);
            }
            if (uploadedVideos.length === MAX_COUNT)
                setVideoFileLimit(true);
            if (uploadedVideos.length > MAX_COUNT) {
                alert("You can only add a maximum of " + MAX_COUNT + " files");
                setVideoFileLimit(false);
                limitExceeded = true;
                return true;
            }
            return false;
        });
        if (!limitExceeded) {
            setUploadedVideoFiles(uploadedVideos);
            // setVideoWidth(`${100 / uploadedFiles.length}%`);
        }
    };
    var handleVideoFileEvent = function (fileList) {
        var chosenFiles = Array.prototype.slice.call(fileList);
        handleUploadVideoFiles(chosenFiles);
    };
    react_1.useEffect(function () {
        console.log({ uploadedVideoFiles: uploadedVideoFiles });
    }, [uploadedVideoFiles]);
    return (react_1["default"].createElement(material_1.Box, { sx: {
            display: "flex",
            flexDirection: "column",
            minHeight: "16vh",
            width: "100%",
            border: 1,
            borderColor: theme.palette.divider,
            m: 0,
            p: 1
        } },
        !!uploadedVideoFiles.length ? (react_1["default"].createElement(material_1.Box, { sx: { width: "100%", minHeight: 150 }, cols: 3, rowHeight: 100 },
            uploadedVideoFiles.map(function (file) { return (react_1["default"].createElement(VideoListItem, { key: file.name },
                react_1["default"].createElement("img", { src: "" + URL.createObjectURL(file), srcSet: "" + URL.createObjectURL(file), alt: file.name, loading: "lazy" }))
                ,
                    react_1["default"].createElement(icons_material_1.CancelTwoTone, { color: "error", className: "shareCancelImg", onClick: function () {
                            setUploadedVideoFiles(uploadedVideoFiles.filter(function (f) { return f.name !== file.name; }));
                            setVideoFileLimit(false);
                        } })) /* </Box> */; }, { /* </Box> */}),
            ")}")) : (react_1["default"].createElement("div", { className: "shareImgContainer" },
            react_1["default"].createElement("img", { className: "shareImg", src: placeHolderVideo1_jpg_1["default"], alt: "", style: { maxWidth: "100%" } }))),
        react_1["default"].createElement("form", { className: "shareBottom" },
            react_1["default"].createElement("div", { className: "shareOptions" },
                react_1["default"].createElement("label", { htmlFor: "file", className: "shareOption" },
                    react_1["default"].createElement(icons_material_1.PermMedia, { htmlColor: "tomato" }),
                    react_1["default"].createElement("input", { disabled: videoFileLimit, multiple: true, style: { display: "none" }, type: "file", id: "file", accept: "video/*", onChange: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var target = e.target;
                            !!target.files &&
                                handleVideoFileEvent(target.files);
                        } }))),
            react_1["default"].createElement("button", { className: "shareButton", type: "submit", disabled: videoFileLimit }, "Upload"))));
}
exports["default"] = UploadVideo;
