// Components
import { ContactPreview } from "./ContactPreview";

// Types
import type { Dispatch, SetStateAction } from "react";
import type { Contact } from "../../types/Contact";

type Props = {
  contacts: Contact[];
  onClick: Dispatch<SetStateAction<string>>;
  onDelete: (contactId: string) => void;
  displayMessagePreview?: boolean;
};

export const ContactsList = ({
  contacts,
  onClick,
  onDelete,
  displayMessagePreview,
}: Props): JSX.Element => (
  <div className="d-flex flex-col w-100 contact-list">
    {contacts.map((contact) => (
      <div key={contact.id}>
        <ContactPreview
          className="contact-item"
          key={contact.id}
          contact={contact}
          onClick={onClick}
          onDelete={onDelete}
          displayMessagePreview={displayMessagePreview}
        />
      </div>
    ))}
  </div>
);
