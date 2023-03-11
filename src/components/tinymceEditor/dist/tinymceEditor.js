"use strict";
exports.__esModule = true;
var react_1 = require("react");
var tinymce_react_1 = require("@tinymce/tinymce-react");
function TinymceEditor() {
    var editorRef = react_1.useRef(null);
    var log = function () {
        var _a;
        if (!!editorRef.current) {
            console.log({
                "editorRef.current?.getContent()": (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getContent()
            });
        }
    };
    react_1.useEffect(function () {
        var _a;
        console.log({
            "editorRef.current?.getContent()": (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getContent()
        });
    }, [editorRef]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(tinymce_react_1.Editor
        // apiKey={process.env.REACT_APP_TINY_APIKEY}
        , { 
            // apiKey={process.env.REACT_APP_TINY_APIKEY}
            onInit: function (evt, editor) {
                return (editorRef.current = editor);
            }, initialValue: "<p>This is the initial content of the editor.</p>", init: {
                height: 500,
                menubar: false,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar: "undo redo | formatselect \n          | bold italic backcolor | alignleft aligncenter alignright alignjustify \n          | bullist numlist outdent indent | removeformat | help | h1 h2 h3 h4 h5 h6",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            } }),
        react_1["default"].createElement("button", { onClick: log }, "Log editor content")));
}
exports["default"] = TinymceEditor;
