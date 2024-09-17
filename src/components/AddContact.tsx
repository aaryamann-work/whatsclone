import { Button } from "@/components/ui/button";
import { InputDialog } from "./Conversation/components/InputDialog";

export const AddContact = ({ onAdd }: { onAdd: (name: string) => void }) => {
  return (
    <InputDialog
      okText="Add"
      header="Add Contact"
      input="Name"
      onAction={onAdd}
    >
      <Button>Add Contact</Button>
    </InputDialog>
  );
};
