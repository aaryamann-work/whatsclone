import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ConfirmationDialog } from "../Conversation/components/ConfirmationDialog";

import { DotsVerticalIcon } from "@radix-ui/react-icons";

// Types
import type { Dispatch, SetStateAction } from "react";
import type { Contact } from "../../types/Contact";

type Props = {
  contact: Contact;
  className?: string;
  onClick?: Dispatch<SetStateAction<string>>;
  onDelete: (contactId: string) => void;
  displayMessagePreview?: boolean;
};

export const ContactPreview = ({
  contact,
  className,
  onClick,
  onDelete,
  displayMessagePreview,
}: Props) => (
  <div
    className={`d-flex gap-1 justify-content-between ${className}`}
    style={{ height: 80 }}
  >
    <div
      className={`d-flex align-items-center gap-1 w-100`}
      onClick={() => onClick?.(contact.id)}
    >
      <img
        src={contact.profileImg}
        className="contact-profile-picture shrink-0"
      />
      <div className="d-flex flex-col">
        <h4 className="m-0">{contact.name}</h4>
        {displayMessagePreview ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="contact-message-preview">
                  {contact.lastMessage?.content}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{contact.lastMessage?.content}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
    </div>
    <Popover>
      <PopoverTrigger>
        <DotsVerticalIcon />
      </PopoverTrigger>
      <PopoverContent style={{ width: "fit-content" }}>
        <ConfirmationDialog onAction={() => onDelete(contact.id)}>
          Delete
        </ConfirmationDialog>
      </PopoverContent>
    </Popover>
  </div>
);
