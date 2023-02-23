import { instance } from ".";
import { IMessage } from "../interfaces";

export const getMessagesByConversationIdParams = (
  token: string,
  conversationId: string,
) => {
  return instance(token).get(`messages/${conversationId}`);
};
export const getLastMessageByConversationIdParams = (
  token: string,
  conversationId: string,
) => {
  return instance(token).get(
    `messages/lastOneOf/${conversationId}`,
  );
};
export const getMessagesArrayFromIds = (
  token: string,
  messagesIds: string[],
) => {
  return instance(token).post(`messages/array/fromIds`, {
    messagesIds,
  });
};

export const createMessage = (
  token: string,
  message: IMessage,
) => {
  return instance(token).post(`messages/`, message);
};
export const messageReceivedByCurrentUser = (
  token: string,
  props: {
    messageId: string;
  },
) => {
  return instance(token).put(
    `messages/receivedBy/currentUser`,
    props,
  );
};
export const messagesCheckedByCurrentUser = (
  token: string,
  props: {
    conversationId: string;
  },
) => {
  return instance(token).put(
    `messages/checkedBy/currentUser`,
    props,
  );
};

export const getCurrentUserUncheckedMessagesByConversationIdParams =
  (token: string, conversationId: string) => {
    return instance(token).get(
      `messages/unchecked/currentUser/${conversationId}`,
    );
  };
