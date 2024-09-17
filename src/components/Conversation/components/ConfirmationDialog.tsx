import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  header?: string;
  children?: React.ReactNode;
  description?: string;
  actionText?: string;
  cancelText?: string;
  onAction: () => void;
  onCancel?: () => void;
};

export const ConfirmationDialog = ({
  header,
  description,
  actionText,
  cancelText,
  onAction,
  onCancel,
  children,
}: Props) => (
  <AlertDialog>
    <AlertDialogTrigger className="w-100">
      {children ?? "Open Dialog"}
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{header ?? "Are you sure?"}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>
          {cancelText ?? "No"}
        </AlertDialogCancel>
        <AlertDialogAction onClick={onAction}>
          {actionText ?? "Yes"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
