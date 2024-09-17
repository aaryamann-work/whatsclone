// Libs
import { useReducer, useState, useCallback } from "react";
import _omit from "lodash/omit";

// Components
import { ContactsList } from "./components/Contacts";
import { Conversation } from "./components/Conversation";
import { Splash } from "./components/Splash";
import { CompactModeSwitcher } from "./components/Conversation/components/CompactModeSwitcher";
import { AddContact } from "./components/AddContact";

// Utils
import { readInitialStateFromStore, saveToStore } from "./lib/store";
import { randomString } from "./utils/randomString";

// CSS
import "./App.css";

// Types
import type {
  ConversationAction,
  ConversationCollection,
} from "./types/Conversation";
import type { Contact } from "./types/Contact";

const executeConversationAction = (
  state: ConversationCollection,
  action: ConversationAction
): ConversationCollection => {
  const { type, contactId } = action;
  switch (type) {
    case "ADD_CONTACT":
      const { name } = action;
      return {
        ...state,
        [contactId]: {
          name,
          profileImg:
            "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
          messages: [],
        },
      };

    case "DELETE_CONTACT":
      return _omit(state, [contactId]);

    case "ADD_MESSAGE":
      const { message } = action;
      return {
        ...state,
        [contactId]: {
          ...state[contactId],
          messages: [
            ...state[contactId].messages,
            {
              id: randomString(),
              sentByContact: false,
              content: message,
              time: new Date().toLocaleTimeString(),
            },
          ],
        },
      };

    case "EDIT_MESSAGE": {
      const { newMessageContent, id } = action;
      const updatedMessages = state[contactId].messages
        .slice()
        .map((message) => {
          if (message.id !== id) return message;
          return {
            ...message,
            content: newMessageContent,
          };
        });
      return {
        ...state,
        [contactId]: {
          ...state[contactId],
          messages: updatedMessages,
        },
      };
      break;
    }

    case "DELETE_MESSAGE": {
      const { id } = action;
      return {
        ...state,
        [contactId]: {
          ...state[contactId],
          messages: state[contactId].messages.filter(
            (message) => message.id != id
          ),
        },
      };
    }
  }
};

const conversationReducer = (
  state: ConversationCollection,
  action: ConversationAction
): ConversationCollection => {
  const updatedConversationState = executeConversationAction(state, action);
  saveToStore(updatedConversationState);
  return updatedConversationState;
};

function App() {
  const [compactMode, setCompactMode] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [conversations, updateConversations] = useReducer(
    conversationReducer,
    JSON.parse(readInitialStateFromStore() ?? "{}")
  );

  const contacts = Object.keys(conversations).reduce(
    (acc, contactId) => [
      ...acc,
      {
        id: contactId,
        name: conversations[contactId].name,
        profileImg: conversations[contactId].profileImg,
        lastMessage: conversations[contactId].messages?.at(-1) ?? null,
      },
    ],
    [] as Contact[]
  );

  const selectedConversation = {
    id: selectedContactId,
    ...conversations[selectedContactId],
    lastMessage: conversations[selectedContactId]?.messages?.at(-1) ?? null,
  };

  const addContact = useCallback(
    (name: string) =>
      updateConversations({
        type: "ADD_CONTACT",
        contactId: `user_${randomString()}`,
        name,
      }),
    [conversations]
  );

  const deleteContact = useCallback((contactId: string) => {
    updateConversations({
      type: "DELETE_CONTACT",
      contactId,
    });
    if (contactId === selectedContactId) setSelectedContactId("");
  }, []);

  const addMessage = useCallback(
    (message: string) =>
      updateConversations({
        type: "ADD_MESSAGE",
        contactId: selectedContactId,
        message,
      }),
    [selectedContactId]
  );

  const editMessage = useCallback(
    (id: string, newMessageContent: string) =>
      updateConversations({
        type: "EDIT_MESSAGE",
        contactId: selectedContactId,
        id,
        newMessageContent,
      }),
    [selectedContactId]
  );

  const deleteMessage = useCallback(
    (id: string) =>
      updateConversations({
        type: "DELETE_MESSAGE",
        contactId: selectedContactId,
        id,
      }),
    [selectedContactId]
  );

  return (
    <div className="d-flex w-100 h-100 chat-app">
      <div className="d-flex flex-1 sidebar">
        <ContactsList
          contacts={contacts}
          onClick={setSelectedContactId}
          onDelete={deleteContact}
          displayMessagePreview={!compactMode}
        />
        <div className="d-flex align-items-center justify-content-between">
          <AddContact onAdd={addContact} />
          <CompactModeSwitcher
            enabled={compactMode}
            onChange={setCompactMode}
          />
        </div>
      </div>
      <div className="d-flex flex-4">
        {!selectedContactId ? (
          <Splash />
        ) : (
          <Conversation
            contact={selectedConversation}
            messages={selectedConversation.messages ?? []}
            displayTimestamp={!compactMode}
            onSend={addMessage}
            onEdit={editMessage}
            onDeleteMessage={deleteMessage}
            onDeleteContact={deleteContact}
          />
        )}
      </div>
    </div>
  );
}

export default App;
