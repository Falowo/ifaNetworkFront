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
require("./uploadFiles.css");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var react_player_1 = require("react-player");
var Title_1 = require("./Title");
var DraftJsEditor_1 = require("../../components/draftJsEditor/DraftJsEditor");
var videoMimeType = /video\/*/i;
var audioMimeType = /audio\/*/i;
var imageMimeType = /image\/(png|jpg|jpeg)/i;
var MAX_COUNT = 3;
function UploadVideo() {
    var theme = styles_1.useTheme();
    var _a = react_1.useState([]), uploadedVideoFiles = _a[0], setUploadedVideoFiles = _a[1];
    var _b = react_1.useState([]), uploadedImageFiles = _b[0], setUploadedImageFiles = _b[1];
    var _c = react_1.useState([]), uploadedAudioFiles = _c[0], setUploadedAudioFiles = _c[1];
    var _d = react_1.useState(false), videoFileLimitReached = _d[0], setVideoFileLimitReached = _d[1];
    var _e = react_1.useState(false), imageFileLimitReached = _e[0], setImageFileLimitReached = _e[1];
    var _f = react_1.useState(false), audioFileLimitReached = _f[0], setAudioFileLimitReached = _f[1];
    var _g = react_1.useState("video/*, image/*, audio/*"), acceptedFiles = _g[0], setAcceptedFiles = _g[1];
    react_1.useEffect(function () {
        if (videoFileLimitReached &&
            imageFileLimitReached &&
            audioFileLimitReached) {
            setAcceptedFiles("");
        }
        else if (!videoFileLimitReached &&
            !imageFileLimitReached &&
            audioFileLimitReached) {
            setAcceptedFiles("video/*, image/*");
        }
        else if (!videoFileLimitReached &&
            imageFileLimitReached &&
            !audioFileLimitReached) {
            setAcceptedFiles("video/*, audio/*");
        }
        else if (videoFileLimitReached &&
            !imageFileLimitReached &&
            !audioFileLimitReached) {
            setAcceptedFiles("image/*, audio/*");
        }
        else if (videoFileLimitReached &&
            imageFileLimitReached &&
            !audioFileLimitReached) {
            setAcceptedFiles("audio/*");
        }
        else if (videoFileLimitReached &&
            !imageFileLimitReached &&
            audioFileLimitReached) {
            setAcceptedFiles("image/*");
        }
        else if (!videoFileLimitReached &&
            imageFileLimitReached &&
            audioFileLimitReached) {
            setAcceptedFiles("video/*");
        }
        console.log({ acceptedFiles: acceptedFiles });
    }, [
        videoFileLimitReached,
        imageFileLimitReached,
        audioFileLimitReached,
        acceptedFiles,
    ]);
    var handleUploadVideoFiles = function (files) {
        var uploadedVideos = __spreadArrays(uploadedVideoFiles);
        var uploadedImages = __spreadArrays(uploadedImageFiles);
        var uploadedAudios = __spreadArrays(uploadedAudioFiles);
        var videoLimitExceeded = false;
        var imageLimitExceeded = false;
        var audioLimitExceeded = false;
        files.some(function (file) {
            if (!(file.type.match(videoMimeType) ||
                file.type.match(imageMimeType) ||
                file.type.match(audioMimeType))) {
                alert("File mime type is not valid");
                return true;
            }
            // If Video File
            if (file.type.match(videoMimeType)) {
                if (uploadedVideos.findIndex(function (f) { return f.name === file.name; }) === -1) {
                    uploadedVideos.push(file);
                }
                if (uploadedVideos.length === MAX_COUNT)
                    setVideoFileLimitReached(true);
                if (uploadedVideos.length > MAX_COUNT) {
                    alert("You can only add a maximum of " + MAX_COUNT + " files");
                    setVideoFileLimitReached(false);
                    videoLimitExceeded = true;
                    return true;
                }
                return false;
            }
            // if image File
            else if (file.type.match(imageMimeType)) {
                if (uploadedImages.findIndex(function (f) { return f.name === file.name; }) === -1) {
                    uploadedImages.push(file);
                }
                if (uploadedImages.length === MAX_COUNT)
                    setImageFileLimitReached(true);
                if (uploadedImages.length > MAX_COUNT) {
                    alert("You can only add a maximum of " + MAX_COUNT + " files");
                    setImageFileLimitReached(false);
                    imageLimitExceeded = true;
                    return true;
                }
                return false;
            }
            // if audio File
            else if (file.type.match(audioMimeType)) {
                if (uploadedAudios.findIndex(function (f) { return f.name === file.name; }) === -1) {
                    uploadedAudios.push(file);
                }
                if (uploadedAudios.length === MAX_COUNT)
                    setAudioFileLimitReached(true);
                if (uploadedAudios.length > MAX_COUNT) {
                    alert("You can only add a maximum of " + MAX_COUNT + " files");
                    setAudioFileLimitReached(false);
                    audioLimitExceeded = true;
                    return true;
                }
                return false;
            }
            else
                return true;
        });
        if (!videoLimitExceeded) {
            setUploadedVideoFiles(uploadedVideos);
        }
        if (!imageLimitExceeded) {
            setUploadedImageFiles(uploadedImages);
        }
        if (!audioLimitExceeded) {
            setUploadedAudioFiles(uploadedAudios);
        }
    };
    var handleFileEvent = function (fileList) {
        var chosenFiles = Array.prototype.slice.call(fileList);
        handleUploadVideoFiles(chosenFiles);
    };
    react_1.useEffect(function () {
        console.log({
            uploadedAudioFiles: uploadedAudioFiles,
            uploadedVideoFiles: uploadedVideoFiles,
            uploadedImageFiles: uploadedImageFiles
        });
    }, [
        uploadedAudioFiles,
        uploadedImageFiles,
        uploadedVideoFiles,
    ]);
    return (react_1["default"].createElement(material_1.Box, { sx: {
            display: "flex",
            flexDirection: "column",
            minHeight: "16vh",
            width: "100%",
            border: 1,
            borderColor: theme.palette.divider,
            m: 0,
            p: 1,
            alignItems: "center"
        } },
        !!uploadedAudioFiles.length &&
            uploadedAudioFiles.map(function (file) { return (react_1["default"].createElement(material_1.Box, { className: "shareImgContainer", sx: { width: "100%" } },
                react_1["default"].createElement(react_player_1["default"], { url: "" + URL.createObjectURL(file), controls: true, style: {
                        border: "1px solid " + theme.palette.divider
                    }, height: "50px", width: "100%" }),
                react_1["default"].createElement(icons_material_1.CancelTwoTone, { color: "error", className: "shareCancelImg", onClick: function () {
                        setUploadedVideoFiles(uploadedVideoFiles.filter(function (f) { return f.name !== file.name; }));
                        setVideoFileLimitReached(false);
                    } }))); }),
        react_1["default"].createElement(Title_1["default"], null),
        !!uploadedImageFiles.length && (react_1["default"].createElement(material_1.ImageList, { sx: { width: "100%", minHeight: 150 }, cols: 3, rowHeight: 100 }, uploadedImageFiles.map(function (file) { return (react_1["default"].createElement(material_1.ImageListItem, { key: file.name },
            react_1["default"].createElement("img", { src: "" + URL.createObjectURL(file), srcSet: "" + URL.createObjectURL(file), alt: file.name, loading: "lazy" }),
            react_1["default"].createElement(icons_material_1.CancelTwoTone, { color: "error", className: "shareCancelImg", onClick: function () {
                    setUploadedImageFiles(uploadedImageFiles.filter(function (f) { return f.name !== file.name; }));
                    setImageFileLimitReached(false);
                } }))); }))),
        react_1["default"].createElement(DraftJsEditor_1["default"], null),
        !!uploadedVideoFiles.length && (react_1["default"].createElement(material_1.Box, { sx: {
                width: "100%",
                display: "flex",
                flexDirection: "column"
            } }, uploadedVideoFiles.map(function (file) { return (react_1["default"].createElement(material_1.Box, { className: "shareImgContainer" },
            react_1["default"].createElement(react_player_1["default"], { url: "" + URL.createObjectURL(file), controls: true, style: {
                    border: "1px solid " + theme.palette.divider
                }, width: "100%" }),
            react_1["default"].createElement(icons_material_1.CancelTwoTone, { color: "error", className: "shareCancelImg", onClick: function () {
                    setUploadedVideoFiles(uploadedVideoFiles.filter(function (f) { return f.name !== file.name; }));
                    setVideoFileLimitReached(false);
                } }))); }))),
        react_1["default"].createElement("form", { className: "shareBottom", style: { display: "flex", justifyContent: "space-between" }
                >
                    react_1["default"].createElement("div", { className: "shareOptions" },
                        react_1["default"].createElement("label", { htmlFor: "file", className: "shareOption", style: {
                                display: "flex"
                            } },
                            react_1["default"].createElement(icons_material_1.PermMedia, { htmlColor: "tomato", className: "shareOption", onClick: function (e) { return e.preventDefault(); }, sx: {
                                    flexGrow: "1",
                                    border: 1,
                                    justifyContent: "space-evenly"
                                } },
                                react_1["default"].createElement("span", { className: "shareOptionText" }, "Video"),
                                react_1["default"].createElement("input", { disabled: videoFileLimitReached &&
                                        imageFileLimitReached &&
                                        audioFileLimitReached, multiple: true, style: { display: "none" }, type: "file", id: "file", accept: acceptedFiles, onChange: function (e) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        var target = e.target;
                                        !!target.files &&
                                            handleFileEvent(target.files);
                                    } }))),
                        react_1["default"].createElement(material_1.Button, { type: "submit", disabled: videoFileLimitReached &&
                                imageFileLimitReached &&
                                audioFileLimitReached, color: "success", variant: "contained" }, "Upload")) }),
        "Box>"));
}
exports["default"] = UploadVideo;
