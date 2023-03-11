import React, { useEffect, useState } from "react";
import {
  CancelTwoTone,
  PermMedia,
} from "@mui/icons-material";

import "./postEditor.css";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactPlayer from "react-player";
import Title from "./Title";
import DraftJsEditor from "../../components/draftJsEditor/DraftJsEditor";
const videoMimeType = /video\/*/i;
const audioMimeType = /audio\/*/i;
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const MAX_COUNT = 3;

export default function UploadVideo() {
  const theme = useTheme();

  const [uploadedVideoFiles, setUploadedVideoFiles] =
    useState<File[]>([]);
  const [uploadedImageFiles, setUploadedImageFiles] =
    useState<File[]>([]);
  const [uploadedAudioFiles, setUploadedAudioFiles] =
    useState<File[]>([]);

  const [videoFileLimitReached, setVideoFileLimitReached] =
    useState(false);
  const [imageFileLimitReached, setImageFileLimitReached] =
    useState(false);
  const [audioFileLimitReached, setAudioFileLimitReached] =
    useState(false);

  const [acceptedFiles, setAcceptedFiles] =
    useState<string>("video/*, image/*, audio/*");

  useEffect(() => {
    if (
      videoFileLimitReached &&
      imageFileLimitReached &&
      audioFileLimitReached
    ) {
      setAcceptedFiles("");
    } else if (
      !videoFileLimitReached &&
      !imageFileLimitReached &&
      audioFileLimitReached
    ) {
      setAcceptedFiles("video/*, image/*");
    } else if (
      !videoFileLimitReached &&
      imageFileLimitReached &&
      !audioFileLimitReached
    ) {
      setAcceptedFiles("video/*, audio/*");
    } else if (
      videoFileLimitReached &&
      !imageFileLimitReached &&
      !audioFileLimitReached
    ) {
      setAcceptedFiles("image/*, audio/*");
    } else if (
      videoFileLimitReached &&
      imageFileLimitReached &&
      !audioFileLimitReached
    ) {
      setAcceptedFiles("audio/*");
    } else if (
      videoFileLimitReached &&
      !imageFileLimitReached &&
      audioFileLimitReached
    ) {
      setAcceptedFiles("image/*");
    } else if (
      !videoFileLimitReached &&
      imageFileLimitReached &&
      audioFileLimitReached
    ) {
      setAcceptedFiles("video/*");
    }
    console.log({ acceptedFiles });
  }, [
    videoFileLimitReached,
    imageFileLimitReached,
    audioFileLimitReached,
    acceptedFiles,
  ]);

  const handleUploadVideoFiles = (files: File[]) => {
    const uploadedVideos = [...uploadedVideoFiles];
    const uploadedImages = [...uploadedImageFiles];
    const uploadedAudios = [...uploadedAudioFiles];

    let videoLimitExceeded = false;
    let imageLimitExceeded = false;
    let audioLimitExceeded = false;

    files.some((file: File) => {
      if (
        !(
          file.type.match(videoMimeType) ||
          file.type.match(imageMimeType) ||
          file.type.match(audioMimeType)
        )
      ) {
        alert("File mime type is not valid");
        return true;
      }
      // If Video File

      if (file.type.match(videoMimeType)) {
        if (
          uploadedVideos.findIndex(
            (f) => f.name === file.name,
          ) === -1
        ) {
          uploadedVideos.push(file);
        }

        if (uploadedVideos.length === MAX_COUNT)
          setVideoFileLimitReached(true);

        if (uploadedVideos.length > MAX_COUNT) {
          alert(
            `You can only add a maximum of ${MAX_COUNT} files`,
          );
          setVideoFileLimitReached(false);
          videoLimitExceeded = true;
          return true;
        }
        return false;
      }
      // if image File
      else if (file.type.match(imageMimeType)) {
        if (
          uploadedImages.findIndex(
            (f) => f.name === file.name,
          ) === -1
        ) {
          uploadedImages.push(file);
        }

        if (uploadedImages.length === MAX_COUNT)
          setImageFileLimitReached(true);

        if (uploadedImages.length > MAX_COUNT) {
          alert(
            `You can only add a maximum of ${MAX_COUNT} files`,
          );
          setImageFileLimitReached(false);
          imageLimitExceeded = true;
          return true;
        }
        return false;
      }
      // if audio File
      else if (file.type.match(audioMimeType)) {
        if (
          uploadedAudios.findIndex(
            (f) => f.name === file.name,
          ) === -1
        ) {
          uploadedAudios.push(file);
        }

        if (uploadedAudios.length === MAX_COUNT)
          setAudioFileLimitReached(true);

        if (uploadedAudios.length > MAX_COUNT) {
          alert(
            `You can only add a maximum of ${MAX_COUNT} files`,
          );
          setAudioFileLimitReached(false);
          audioLimitExceeded = true;
          return true;
        }
        return false;
      } else return true;
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

  const handleFileEvent = (fileList: FileList) => {
    const chosenFiles =
      Array.prototype.slice.call(fileList);
    handleUploadVideoFiles(chosenFiles);
  };

  useEffect(() => {
    console.log({
      uploadedAudioFiles,
      uploadedVideoFiles,
      uploadedImageFiles,
    });
  }, [
    uploadedAudioFiles,
    uploadedImageFiles,
    uploadedVideoFiles,
  ]);

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
        alignItems: "center",
      }}
    >
      {!!uploadedAudioFiles.length &&
        uploadedAudioFiles.map((file) => (
          <Box
            key={file.name}
            className="shareImgContainer"
            sx={{ width: "100%" }}
          >
            <ReactPlayer
              url={`${URL.createObjectURL(file)}`}
              controls={true}
              style={{
                border: `1px solid ${theme.palette.divider}`,
              }}
              height="50px"
              width="100%"
            />

            <CancelTwoTone
              color="error"
              className="shareCancelImg"
              onClick={() => {
                setUploadedVideoFiles(
                  uploadedAudioFiles.filter(
                    (f: File) => f.name !== file.name,
                  ),
                );
                setAudioFileLimitReached(false);
              }}
            />
          </Box>
        ))}
      <Title />
      {!!uploadedImageFiles.length && (
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
                  setImageFileLimitReached(false);
                }}
              />
              {/* </Box> */}
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <DraftJsEditor />

      {!!uploadedVideoFiles.length && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {uploadedVideoFiles.map((file) => (
            <Box
              key={file.name}
              className="shareImgContainer"
              // sx={{ width: "100%" }}
            >
              <ReactPlayer
                url={`${URL.createObjectURL(file)}`}
                controls={true}
                style={{
                  border: `1px solid ${theme.palette.divider}`,
                }}
                width="100%"
                // height="100%"
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
                  setVideoFileLimitReached(false);
                }}
              />
            </Box>
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignSelf: "end",
          width: "100%",
        }}
      >
        <Box
          className="shareOptions"
          sx={{
            alignSelf: "end",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label
            htmlFor="file"
            className="shareOption"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PermMedia htmlColor="tomato" />
            <span className="shareOptionText">Files</span>
            <input
              disabled={
                videoFileLimitReached &&
                imageFileLimitReached &&
                audioFileLimitReached
              }
              multiple
              style={{ display: "none" }}
              type="file"
              id="file"
              accept={acceptedFiles}
              onChange={(e: React.ChangeEvent) => {
                e.preventDefault();
                e.stopPropagation();
                const target = e.target as HTMLInputElement;
                !!target.files &&
                  handleFileEvent(target.files);
              }}
            />
          </label>
        </Box>
        <Button
          className="shareButton"
          type="submit"
          disabled={
            videoFileLimitReached &&
            imageFileLimitReached &&
            audioFileLimitReached
          }
          sx={{ alignSelf: "end" }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}
