"use client";
import { Smile } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { getAllInstitutes } from "@/lib/api";
import { Institute } from "@/global/types";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function ShowInstitutesDialog({
  selectedInstitute,
  handleOptionChange,
}: {
  selectedInstitute: string | null;
  handleOptionChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [institutes, setInstitutes] = useState<Institute[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const fetchALLInstitutes = async () => {
      const res = await getAllInstitutes();
      setInstitutes(res);
    };

    fetchALLInstitutes();
  }, []);

  const SelectHandler = (institute: string) => {
    handleOptionChange(institute);
    setOpen(false);
  };

  return (
    <>
      <p className="text-sm flex-center flex-col" onClick={() => setOpen(true)}>
        {selectedInstitute ? (
          <span
            className={`${cn(buttonVariants({ variant: "outline" }))} w-full`}
          >
            {selectedInstitute}{" "}
          </span>
        ) : (
          <div className="flex w-fit text-nowrap ml-10">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 text-nowrap">
              <span className="text-xs">Ctrl +</span>J
            </kbd>
            <span>&nbsp; to open</span>
          </div>
        )}
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {institutes.map(({ _id, logo, name }) => (
            <CommandItem
              onSelect={(value) => SelectHandler(value)}
              value={name}
              key={_id}
            >
              <Smile className="mr-2 h-4 w-4" />
              <span>{name}</span>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
