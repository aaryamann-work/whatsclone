import { Message } from "./Message";

export type ConversationCollection = {
  [key: string]: {
    name: string;
    profileImg: string;
    messages: Message[];
  };
};

type AddContact = {
  type: "ADD_CONTACT";
  contactId: string;
  name: string;
};

type DeleteContact = {
  type: "DELETE_CONTACT";
  contactId: string;
};

type AddMessage = {
  type: "ADD_MESSAGE";
  contactId: string;
  message: string;
};

type EditMessage = {
  type: "EDIT_MESSAGE";
  contactId: string;
  id: string;
  newMessageContent: string;
};

type DeleteMessage = {
  type: "DELETE_MESSAGE";
  contactId: string;
  id: string;
};

export type ConversationAction =
  | AddContact
  | DeleteContact
  | AddMessage
  | EditMessage
  | DeleteMessage;
