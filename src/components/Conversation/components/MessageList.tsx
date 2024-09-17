import { useRef, useEffect, useCallback } from "react";
import { EmptyChatSplash } from "./EmptyChatSplash";
import { MessageBubble } from "./MessageBubble";

// Types
import type { Message } from "../../../types/Message";
import { usePrevious } from "../../../hooks/usePrevious";

type Props = {
  messages: Message[];
  onEdit: (id: string, newMessageContent: string) => void;
  onDelete: (id: string) => void;
  displayTimestamp?: boolean;
};

export const MessageList = ({
  messages,
  displayTimestamp,
  onEdit,
  onDelete,
}: Props) => {
  const prevLastMessageId = usePrevious(messages[messages.length - 1]?.id);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  useEffect(() => {
    const lastMessageId = messages[messages.length - 1]?.id;
    if (lastMessageId && lastMessageId !== prevLastMessageId) scrollToBottom();
  }, [messages]);

  return (
    <div className="d-flex flex-col h-100 w-100">
      <div
        className="d-flex flex-col gap-0.5 h-100 w-100"
        style={{ overflowY: "auto" }}
      >
        {messages.length ? (
          messages.map(
            ({ content, time, sentByContact, id }: Message, messageIndex) => (
              <div
                key={messageIndex}
                className={`d-flex ${
                  sentByContact
                    ? "justify-content-start"
                    : "justify-content-end"
                }`}
              >
                <MessageBubble
                  content={content}
                  className={sentByContact ? "received" : "sent"}
                  time={time}
                  displayTimestamp={displayTimestamp}
                  onEdit={(newMessageContent: string) =>
                    onEdit(id, newMessageContent)
                  }
                  onDelete={() => onDelete(id)}
                />
              </div>
            )
          )
        ) : (
          <EmptyChatSplash />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};
