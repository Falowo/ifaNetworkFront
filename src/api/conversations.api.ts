import { instance } from ".";

export const getCurrentUserConversations = (
  token: string,
) => {
  return instance(token).get(`conversations/allOfUser`);
};

export const getCurrentUserLastConversation = (
  token: string,
) => {
  return instance(token).get(`conversations/last`);
};

export const getPrivateConversationByFriendIdParams = (
  token: string,
  userId: string,
) => {
  return instance(token).get(
    `conversations/private/${userId}`,
  );
};
export const createNewConversation = (
  token: string,
  receiversId: string[],
  groupName?: string,
) => {
  return instance(token).post(`conversations/`, {
    receiversId,
    groupName,
  });
};
