import { instance } from ".";
import { IPost } from "../interfaces";

export const getPostsByUserNameParams = (
  token: string,
  username: string,
) => {
  return instance(token).get(`posts/profile/${username}`);
};

export const getCurrentUserTimelinePosts = (
  token: string,
) => {
  return instance(token).get(`posts/timeline/currentUser`);
};

export const likePost = (token: string, postId: string) => {
  return instance(token).put(`posts/${postId}/like`);
};

export const createPost = (
  token: string,
  newPost: IPost,
) => {
  return instance(token).post(`posts`, { ...newPost });
};
export const deletePost = (token: string, id: string) => {
  return instance(token).delete(`posts/${id}`);
};
export const updatePost = (
  token: string,
  updatedPost: IPost,
) => {
  return instance(token).put(`posts/update`, {
    updatedPost,
  });
};

export const uploadFile = (
  token: string,
  data: FormData,
) => {
  return instance(token).post(`upload`, data);
};
