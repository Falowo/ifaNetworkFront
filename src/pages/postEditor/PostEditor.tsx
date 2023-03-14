import React, { useEffect, useState } from "react";
import {
  CancelTwoTone,
  FileDownload,
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
// import TinymceEditor from "../../components/tinymceEditor/tinymceEditor";
import QuillEditor from "../../components/quillEditor/QuillEditor";
import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks";
import {
  selectTemporaryPost,
  setTemporaryPost,
} from "../../app/slices/postSlice";
import { useLocation, useParams } from "react-router-dom";
// import DraftJsEditor from "../../components/draftJsEditor/DraftJsEditor";
const videoMimeType = /video\/*/i;
const audioMimeType = /audio\/*/i;
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const MAX_COUNT = 3;

export default function PostEditor() {
  const { pathname } = useLocation();
  const { pageId, binId } = useParams();
  console.log({ pathname });

  const theme = useTheme();
  const temporaryPost = useAppSelector(selectTemporaryPost);
  const dispatch = useAppDispatch();

  const [uploadedVideoFiles, setUploadedVideoFiles] =
    useState<File[]>([]);
  const [uploadedImageFiles, setUploadedImageFiles] =
    useState<File[]>([]);
  const [uploadedAudioFiles, setUploadedAudioFiles] =
    useState<File[]>([]);

  useEffect(() => {
    console.log({ pathname, pageId, binId });

    if (pathname.includes("page")) {
      if (!!pageId) {
        console.log({ pageId });
        if (temporaryPost?.pageId !== pageId) {
          dispatch(
            setTemporaryPost({
              pageId,
            }),
          );
        }
      }
    } else if (pathname.includes("odu")) {
      if (!!binId) {
        if (temporaryPost?.oduBinId !== parseInt(binId)) {
          dispatch(
            setTemporaryPost({
              oduBinId: parseInt(binId),
            }),
          );
        }
        console.log({ binId });
      }
    }
    console.log({ temporaryPost });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binId, dispatch, pageId, pathname]);

  useEffect(() => {
    if (!!uploadedAudioFiles.length) {
      const audioFileNames: string[] =
        uploadedAudioFiles.map((f) => f.name);
      dispatch(
        setTemporaryPost({
          ...temporaryPost,
          audioFileNames,
        }),
      );
    }
    if (!!uploadedImageFiles.length) {
      const imageFileNames: string[] =
        uploadedImageFiles.map((f) => f.name);
      dispatch(
        setTemporaryPost({
          ...temporaryPost,
          imageFileNames,
        }),
      );
    }
    if (!!uploadedVideoFiles.length) {
      const videoFileNames: string[] =
        uploadedVideoFiles.map((f) => f.name);
      dispatch(
        setTemporaryPost({
          ...temporaryPost,
          videoFileNames,
        }),
      );
    }
    console.log({ temporaryPost });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    uploadedAudioFiles,
    uploadedImageFiles,
    uploadedVideoFiles,
  ]);

  useEffect(() => {
    console.log({ temporaryPost });
  }, [temporaryPost]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    videoFileLimitReached,
    imageFileLimitReached,
    audioFileLimitReached,
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
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
              url={`${URL.createObjectURL(file)}`}
              controls={true}
              // light={true}
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
                setUploadedAudioFiles(
                  uploadedAudioFiles.filter(
                    (f: File) => f.name !== file.name,
                  ),
                );
                setAudioFileLimitReached(false);
              }}
            />
          </Box>
        ))}
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

      <QuillEditor />
      {/* <TinymceEditor/> */}

      {/* <DraftJsEditor />  */}

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
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
                url={`${URL.createObjectURL(file)}`}
                controls={true}
                style={{
                  border: `1px solid ${theme.palette.divider}`,
                }}
                width="100%"
                // light={true}
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
          alignItems: "center",
          width: "100%",
          pt: "0.5rem",
          justifyContent: "space-between",
        }}
      >
        <Box
          className="shareOptions"
          sx={{
            // alignSelf: "end",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label
            htmlFor="file"
            className="shareOption"
            style={{
              display: "flex",
              // flexDirection: "column",
              padding: "0 1rem",
            }}
          >
            <FileDownload
              color="warning"
              sx={{ mr: "1rem" }}
            />
            <span
              className="shareOptionText"
              style={{ fontSize: "0.8rem" }}
            >
              Add audio, image or video (max: 3 of each)
            </span>
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
        {/* <Box
          sx={{
            justifySelf: "center",
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          Add audio, image or video (max: 3 of each)
        </Box> */}
        <Button
          className="shareButton"
          type="submit"
          disabled={
            videoFileLimitReached &&
            imageFileLimitReached &&
            audioFileLimitReached
          }
          sx={{ alignSelf: "end", px: "1rem" }}
          color="success"
        >
          Publish
        </Button>
      </Box>
    </Box>
  );
}
