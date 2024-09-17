import { Message } from "./Message";

export type Contact = {
  id: string;
  name: string;
  profileImg: string;
  lastMessage: Message | null;
};
