import React, { useEffect, useState } from "react";
import {
  CancelTwoTone,
  PermMedia,
} from "@mui/icons-material";

import "./uploadImage.css";
import {
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlaceHolder from "./images/placeHolderImage1.jpg";

const MAX_COUNT = 15;

export default function UploadImage() {
  const theme = useTheme();

  // const [file, setFile] = useState<File | undefined>();
  const [uploadedFiles, setUploadedFiles] = useState<
    File[]
  >([]);
  const [fileLimit, setFileLimit] = useState(false);

  const handleUploadFiles = (files: File[]) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file: File) => {
      if (
        uploaded.findIndex((f) => f.name === file.name) ===
        -1
      ) {
        uploaded.push(file);
      }
      if (uploaded.length === MAX_COUNT) setFileLimit(true);
      if (uploaded.length > MAX_COUNT) {
        alert(
          `You can only add a maximum of ${MAX_COUNT} files`,
        );
        setFileLimit(false);
        limitExceeded = true;
        return true;
      }
      return false;
    });
    if (!limitExceeded) {
      setUploadedFiles(uploaded);
      // setImageWidth(`${100 / uploadedFiles.length}%`);
    }
  };

  const handleFileEvent = (fileList: FileList) => {
    const chosenFiles =
      Array.prototype.slice.call(fileList);
    handleUploadFiles(chosenFiles);
  };

  useEffect(() => {
    console.log({ uploadedFiles });
  }, [uploadedFiles]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "16vh",
        width: "100%",
        border: 1,
        borderColor: theme.palette.divider,
        m: 0,
        p: 1,
      }}
    >
      {/* <Box
        sx={{ display: "flex", width: "100%" }}
      > */}

      {!!uploadedFiles.length ? (
        <ImageList
          sx={{ width: "100%", minHeight: 150 }}
          cols={3}
          rowHeight={100}
        >
          {uploadedFiles.map((file) => (
            // <Box
            //   className="shareImgContainer"
            //   sx={{
            //     display: "flex",
            //     flexDirection: "row-reverse",
            //   }}
            // >
            <ImageListItem key={file.name}>
              <img
                // className="shareImg"
                // src={URL.createObjectURL(file)}
                // alt={file.name}
                // style={{ maxWidth: "100%" }}
                src={`${URL.createObjectURL(file)}`}
                srcSet={`${URL.createObjectURL(file)}`}
                alt={file.name}
                loading="lazy"
              />
              <CancelTwoTone
                color="error"
                className="shareCancelImg"
                onClick={() => {
                  setUploadedFiles(
                    uploadedFiles.filter(
                      (f: File) => f.name !== file.name,
                    ),
                  );
                  setFileLimit(false);
                }}
              />
              {/* </Box> */}
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <div className="shareImgContainer">
          <img
            className="shareImg"
            src={PlaceHolder}
            alt=""
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
      {/* </Box> */}

      <form
        className="shareBottom"
        // onSubmit={submitHandler}
      >
        <div className="shareOptions">
          <label htmlFor="file" className="shareOption">
            <PermMedia htmlColor="tomato" />
            {/* <span className="shareOptionText">
                Photo
              </span> */}
            <input
              disabled={fileLimit}
              multiple
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e: React.ChangeEvent) => {
                e.preventDefault();
                e.stopPropagation();
                const target = e.target as HTMLInputElement;
                !!target.files &&
                  handleFileEvent(target.files);
              }}
            />
          </label>
        </div>
        <button
          className="shareButton"
          type="submit"
          disabled={fileLimit}
        >
          {/* {!isEditing ? `Share` : `Edit`} */}
          Upload
        </button>
      </form>
    </Box>
  );
}
