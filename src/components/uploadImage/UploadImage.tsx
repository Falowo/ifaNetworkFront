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

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const MAX_COUNT = 15;

export default function UploadImage() {
  const theme = useTheme();

  const [uploadedImageFiles, setUploadedImageFiles] =
    useState<File[]>([]);
  const [imageFileLimit, setImageFileLimit] =
    useState(false);

  const handleUploadImageFiles = (files: File[]) => {
    const uploadedImages = [...uploadedImageFiles];
    let limitExceeded = false;
    files.some((file: File) => {
      if (!file.type.match(imageMimeType)) {
        alert("Image mime type is not valid");
        return true;
      }
      if (
        uploadedImages.findIndex(
          (f) => f.name === file.name,
        ) === -1
      ) {
        uploadedImages.push(file);
      }
      if (uploadedImages.length === MAX_COUNT)
        setImageFileLimit(true);
      if (uploadedImages.length > MAX_COUNT) {
        alert(
          `You can only add a maximum of ${MAX_COUNT} files`,
        );
        setImageFileLimit(false);
        limitExceeded = true;
        return true;
      }
      return false;
    });
    if (!limitExceeded) {
      setUploadedImageFiles(uploadedImages);
      // setImageWidth(`${100 / uploadedFiles.length}%`);
    }
  };

  const handleImageFileEvent = (fileList: FileList) => {
    const chosenFiles =
      Array.prototype.slice.call(fileList);
    handleUploadImageFiles(chosenFiles);
  };

  useEffect(() => {
    console.log({ uploadedImageFiles });
  }, [uploadedImageFiles]);
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

      {!!uploadedImageFiles.length ? (
        <ImageList
          sx={{ width: "100%", minHeight: 150 }}
          cols={3}
          rowHeight={100}
        >
          {uploadedImageFiles.map((file) => (
            <ImageListItem key={file.name}>
              <img
                src={`${URL.createObjectURL(file)}`}
                srcSet={`${URL.createObjectURL(file)}`}
                alt={file.name}
                loading="lazy"
              />

              <CancelTwoTone
                color="error"
                className="shareCancelImg"
                onClick={() => {
                  setUploadedImageFiles(
                    uploadedImageFiles.filter(
                      (f: File) => f.name !== file.name,
                    ),
                  );
                  setImageFileLimit(false);
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
          <label
            htmlFor="file"
            className="shareOption"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PermMedia htmlColor="tomato" />
            <span className="shareOptionText">Image</span>
            <input
              disabled={imageFileLimit}
              multiple
              style={{ display: "none" }}
              type="file"
              id="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent) => {
                e.preventDefault();
                e.stopPropagation();
                const target = e.target as HTMLInputElement;
                !!target.files &&
                  handleImageFileEvent(target.files);
              }}
            />
          </label>
        </div>
        <button
          className="shareButton"
          type="submit"
          disabled={imageFileLimit}
        >
          {/* {!isEditing ? `Share` : `Edit`} */}
          Upload
        </button>
      </form>
    </Box>
  );
}
