import { instance } from ".";
import {
  ToUpdateUserDesc,
  ToUpdateUserInfo,
} from "../interfaces";

export const getUserByUserIdQuery = (
  token: string,
  userId: string,
) => {
  return instance(token).get(`users?userId=${userId}`);
};

export const getUserByUsernameQuery = (
  token: string,
  username: string,
) => {
  return instance(token).get(`users?username=${username}`);
};

export const getFriendsByUserIdParams = (
  token: string,
  userId: string,
) => {
  return instance(token).get(`users/friends/${userId}`);
};

export const getFollowersByUserIdParams = (
  token: string,
  userId: string,
) => {
  return instance(token).get(`users/followers/${userId}`);
};
export const getFollowedUsersByUserIdParams = (
  token: string,
  userId: string,
) => {
  return instance(token).get(
    `users/followedUsers/${userId}`,
  );
};

export const unfollowUser = (
  token: string,
  userId: string,
) => {
  return instance(token).put(
    `users/${userId}/unfollow`,
    {},
  );
};

export const followUser = (
  token: string,
  userId: string,
) => {
  return instance(token).put(`users/${userId}/follow`, {});
};
export const addFriend = (
  token: string,
  userId: string,
) => {
  return instance(token).put(
    `users/${userId}/addFriend`,
    {},
  );
};
export const sendFriendRequest = (
  token: string,
  userId: string,
) => {
  return instance(token).put(
    `users/${userId}/friendRequest`,
    {},
  );
};

export const searchUsersByUsernamePartParams = (
  token: string,
  search: string,
) => {
  return instance(token).get(`users/search/${search}`);
};

export const getBestCurrentUserFriends = (
  token: string,
) => {
  return instance(token).get(
    `users/best/currentUser/friends`,
  );
};

export const getFriendRequestsFrom = (token: string) => {
  return instance(token).get("users/friend/requests/from");
};

export const checkFriendRequests = (token: string) => {
  return instance(token).put(
    "users/currentUser/checkFriendRequests",
  );
};
export const checkAcceptedFriendRequests = (
  token: string,
) => {
  return instance(token).put(
    "users/currentUser/checkAcceptedFriendRequests",
  );
};

export const editProfilePicture = (
  token: string,
  fileName: string,
) => {
  return instance(token).put(
    "users/currentUser/editProfilePicture",
    { fileName },
  );
};
export const editCoverPicture = (
  token: string,
  fileName: string,
) => {
  return instance(token).put(
    "users/currentUser/editCoverPicture",
    { fileName },
  );
};

export const updateCurrentUserInfo = (
  token: string,
  toUpdateUserInfo: ToUpdateUserInfo,
) => {
  return instance(token).put(
    "users/currentUser/updateInfo",
    {
      toUpdateUserInfo,
    },
  );
};

export const updateCurrentUserDesc = (
  token: string,
  toUpdateUserDesc: ToUpdateUserDesc,
) => {
  console.log(toUpdateUserDesc);

  return instance(token).put(
    "users/currentUser/updateDesc",
    {
      toUpdateUserDesc,
    },
  );
};
