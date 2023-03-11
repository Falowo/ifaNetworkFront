import React, { useEffect, useState } from "react";
import {
  CancelTwoTone,
  PermMedia,
} from "@mui/icons-material";

import "./uploadVideo.css";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlaceHolder from "../uploadImage/images/placeHolderImage1.jpg";
import ReactPlayer from "react-player";
const videoMimeType = /video\/*/i;
const MAX_COUNT = 15;

export default function UploadVideo() {
  const theme = useTheme();

  const [uploadedVideoFiles, setUploadedVideoFiles] =
    useState<File[]>([]);
  const [videoFileLimit, setVideoFileLimit] =
    useState(false);

  const handleUploadVideoFiles = (files: File[]) => {
    const uploadedVideos = [...uploadedVideoFiles];
    let limitExceeded = false;
    files.some((file: File) => {
      if (!file.type.match(videoMimeType)) {
        alert("Video mime type is not valid");
        return true;
      }
      if (
        uploadedVideos.findIndex(
          (f) => f.name === file.name,
        ) === -1
      ) {
        uploadedVideos.push(file);
      }
      if (uploadedVideos.length === MAX_COUNT)
        setVideoFileLimit(true);
      if (uploadedVideos.length > MAX_COUNT) {
        alert(
          `You can only add a maximum of ${MAX_COUNT} files`,
        );
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

  const handleVideoFileEvent = (fileList: FileList) => {
    const chosenFiles =
      Array.prototype.slice.call(fileList);
    handleUploadVideoFiles(chosenFiles);
  };

  useEffect(() => {
    console.log({ uploadedVideoFiles });
  }, [uploadedVideoFiles]);
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

      {!!uploadedVideoFiles.length ? (
        <Box
          sx={{
            width: "100%",
            minHeight: 150,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {uploadedVideoFiles.map((file) => (
            <Box>
              <ReactPlayer
                url={`${URL.createObjectURL(file)}`}
                controls={true}
              />

              <CancelTwoTone
                color="error"
                className="shareCancelImg"
                onClick={() => {
                  setUploadedVideoFiles(
                    uploadedVideoFiles.filter(
                      (f: File) => f.name !== file.name,
                    ),
                  );
                  setVideoFileLimit(false);
                }}
              />
            </Box>
          ))}
        </Box>
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
            <span className="shareOptionText">Video</span>
            <input
              disabled={videoFileLimit}
              multiple
              style={{ display: "none" }}
              type="file"
              id="file"
              accept="video/*, image/*"
              onChange={(e: React.ChangeEvent) => {
                e.preventDefault();
                e.stopPropagation();
                const target = e.target as HTMLInputElement;
                !!target.files &&
                  handleVideoFileEvent(target.files);
              }}
            />
          </label>
        </div>
        <button
          className="shareButton"
          type="submit"
          disabled={videoFileLimit}
        >
          {/* {!isEditing ? `Share` : `Edit`} */}
          Upload
        </button>
      </form>
    </Box>
  );
}
