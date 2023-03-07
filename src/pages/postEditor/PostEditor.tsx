import React, { useState, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import * as DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./postEditor.css";
export default function MyEditor(props: {
  htmlToEdit?: string;
}) {
  let { htmlToEdit } = props;

  if (!htmlToEdit) {
    htmlToEdit = `<h1>Osun niya</h1>\n<p>Lorem ipsum dolor&nbsp;</p>\n<p></p>\n`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const getInitialEditorState = (htmlToEdit: string) => {
    const blocksFromHtml = htmlToDraft(htmlToEdit);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap,
    );
    return EditorState.createWithContent(contentState);
  };

  const [editorState, setEditorState] =
    useState<EditorState>(
      !htmlToEdit
        ? EditorState.createEmpty()
        : getInitialEditorState(htmlToEdit),
    );

  const [convertedContent, setConvertedContent] = useState<
    string | null
  >(null);

  const [markup, setMarkup] = useState<
    string | undefined
  >();

  const createPurifiedMarkup = (markup: string) => {
    return { __html: DOMPurify.sanitize(markup) };
  };

  useEffect(() => {
    let html = convertToHTML(
      editorState.getCurrentContent(),
    );
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    let rawContentState = convertToRaw(
      editorState.getCurrentContent(),
    );

    !!rawContentState &&
      setMarkup(draftToHtml(rawContentState));
  }, [editorState]);

  useEffect(() => {
    console.log({ convertedContent });
    console.log({ markup });
  }, [convertedContent, markup]);

  return (
    <div className="myEditor">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {!!markup && (
        <div
          className="preview"
          dangerouslySetInnerHTML={createPurifiedMarkup(
            markup,
          )}
        ></div>
      )}
    </div>
  );
}
