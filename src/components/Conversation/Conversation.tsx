// Components
import { ContactPreview } from "../Contacts/ContactPreview";
import { MessageInput } from "./components/MessageInput";
import { MessageList } from "./components/MessageList";

// Types
import { Contact } from "../../types/Contact";
import { Message } from "../../types/Message";

/*
  Features to add: 
    1. Add conversation instead of hardcoded
    2. Save conversation state in local storage
    3. Allow editing along with delete
    4. Scroll to bottom on new message
    5. Message preview in left pane
    6. Compact / Spacious mode
    7. 

*/

type Props = {
  contact: Contact;
  messages: Message[];
  onSend: (message: string) => void;
  onDeleteMessage: (id: string) => void;
  onDeleteContact: (id: string) => void;
  onEdit: (id: string, newMessageContent: string) => void;
  displayTimestamp?: boolean;
};

export const Conversation = ({
  contact,
  messages,
  onSend,
  onEdit,
  onDeleteMessage,
  onDeleteContact,
  displayTimestamp,
}: Props): JSX.Element => (
  <div className="h-100 w-100 d-flex flex-col">
    <div style={{ height: 78 }}>
      <ContactPreview
        className="h-100 chat-header"
        contact={contact}
        onDelete={onDeleteContact}
      />
    </div>
    <div
      className="w-100 p-1 d-flex flex-1 border-box chat-body"
      style={{ height: `calc(100vh - 150)`, overflow: "scroll" }}
    >
      <MessageList
        messages={messages}
        onEdit={onEdit}
        onDelete={onDeleteMessage}
        displayTimestamp={displayTimestamp}
      />
    </div>
    <div className="w-100 px-1 chat-footer" style={{ height: 72 }}>
      <MessageInput onSend={onSend} />
    </div>
  </div>
);
