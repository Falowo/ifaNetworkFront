import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as DOMPurify from "dompurify";
import "./quillEditor.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks";
import {
  selectTemporaryPost,
  setTemporaryPost,
} from "../../app/slices/postSlice";

export default function QuillEditor() {
  const [value, setValue] = useState("");
  const temporaryPost = useAppSelector(selectTemporaryPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!value) {
      console.log({ value });

      const content = DOMPurify.sanitize(value);
      dispatch(
        setTemporaryPost({ ...temporaryPost, content }),
      );
      console.log({ temporaryPost });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, value]);

  return (
    <>
      <ReactQuill
        className="quillEditor"
        id="quillEditor"
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Write your post here"
      />
      {/* {!!temporaryPost?.content && (
        <>
          <div
            className="preview"
            dangerouslySetInnerHTML={{
              __html: temporaryPost?.content,
            }}
          ></div>
          <div>{value}</div>
        </>
      )} */}
    </>
  );
}
