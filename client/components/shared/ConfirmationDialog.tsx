import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ConfirmationDialog({
  open,
  setOpen,
  HandleDelete,
  HandleCancel,
  title,
  description,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  HandleDelete: () => void;
  HandleCancel: () => void;
  title: string;
  description: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div className="w-full text-right space-x-4 mt-12">
            <Button variant="outline" onClick={HandleCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={HandleDelete}>
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
