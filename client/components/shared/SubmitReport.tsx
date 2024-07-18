import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

export default function SubmitReportDialog({
  open,
  setOpen,
  HandleSubmit,
  title,
  description,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  HandleSubmit: (about: string) => void;
  title: string;
  description: string;
}) {
  const [about, setAbout] = useState<string>("");

  const handleSubmitClick = () => {
    HandleSubmit(about);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          type="file"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className="w-full text-right space-x-4 mt-12">
          <Button variant="destructive" onClick={handleSubmitClick}>
            Submit Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
