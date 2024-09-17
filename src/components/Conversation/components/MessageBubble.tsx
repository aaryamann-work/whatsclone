import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { InputDialog } from "./InputDialog";

type Props = {
  content: string;
  time: string;
  onEdit: (newMessageContent: string) => void;
  onDelete: () => void;
  className?: string;
  displayTimestamp?: boolean;
};

export const MessageBubble = ({
  content,
  time,
  onEdit,
  onDelete,
  className,
  displayTimestamp,
}: Props) => (
  <HoverCard>
    <HoverCardTrigger className={`message message-bubble ${className}`}>
      <p>{content}</p>
      {displayTimestamp ? (
        <div className="w-100 d-flex justify-content-end align-items-center gap-0.25">
          <span className="color-grey-200 font-10">{time}</span>
        </div>
      ) : null}
    </HoverCardTrigger>
    <HoverCardContent>
      <InputDialog header="Edit Message" input="Message" onAction={onEdit}>
        Edit
      </InputDialog>
      <ConfirmationDialog onAction={onDelete}>Delete</ConfirmationDialog>
    </HoverCardContent>
  </HoverCard>
);
