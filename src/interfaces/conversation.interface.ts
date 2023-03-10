import { IMessage, IPMessage } from "./message.interface";

export interface IConversation {
  _id?: string;
  membersId?: string[];
  adminsId?: string[];
  groupName?: string;
  groupPicture?: string;
  lastMessageId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPConversation {
  _id?: string;
  membersId?: string[];
  adminsId?: string[];
  groupName?: string;
  groupPicture?: string;
  lastMessageId?: IMessage;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPPConversation {
  _id?: string;
  membersId?: string[];
  adminsId?: string[];
  groupName?: string;
  groupPicture?: string;
  lastMessageId?: IPMessage;
  createdAt?: Date;
  updatedAt?: Date;
}
