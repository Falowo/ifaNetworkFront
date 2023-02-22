import { instance } from ".";
import { IPost } from "../interfaces";

export const getPostsByUserNameParams = (
  username: string,
) => {
  return instance().get(`posts/profile/${username}`);
};

export const getCurrentUserTimelinePosts = () => {
  return instance().get(`posts/timeline/currentUser`);
};

export const likePost = (postId: string) => {
  return instance().put(`posts/${postId}/like`);
};

export const createPost = (newPost: IPost) => {
  return instance().post(`posts`, { ...newPost });
};
export const deletePost = (id: string) => {
  return instance().delete(`posts/${id}`);
};
export const updatePost = (updatedPost:IPost) => {
  return instance().put(`posts/update`, {updatedPost});
};

export const uploadFile = (data: FormData) => {
  return instance().post(`upload`, data);
};
