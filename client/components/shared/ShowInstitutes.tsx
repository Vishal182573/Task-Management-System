"use client";
import { CalendarIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { DELETE, UPDATE } from "@/global/constant";
import ConfirmationDialog from "./ConfirmationDialog";
import { deleteInstitute, getAllInstitutes } from "@/lib/api";
import { Institute } from "@/global/types";
import AddInstitute from "../forms/AddInstitute";

export default function ShowInstitutes({
  functionality,
}: {
  functionality: string;
}) {
  const [selectedInstitute, setSelectedInstitute] = useState<string | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [institutes, setInstitutes] = useState<Institute[]>([]);

  useEffect(() => {
    const fetchALLInstitutes = async () => {
      const res = await getAllInstitutes();
      setInstitutes(res);
    };

    fetchALLInstitutes();
  }, []);

  const SelectHandler = (institute: string) => {
    setSelectedInstitute(institute);
    if (functionality === UPDATE) {
      setUpdate(true);
    } else if (functionality === DELETE) {
      setOpen(true);
    }
  };

  const HandleDelete = async () => {
    if (selectedInstitute == "") alert("no selected institute");

    // setUploading(true);
    try {
      await deleteInstitute(selectedInstitute);

      // TODO: update rendered list of Institutes
      alert("Insititute deleted successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      // setUploading(false);
      setOpen(false);
      setSelectedInstitute("");
      setUpdate(false);
    }
  };

  const HandleCancel = () => {
    setSelectedInstitute("");
    setOpen(false);
    setUpdate(false);
  };

  return (
    <>
      {update === true ? (
        <AddInstitute
          institute={selectedInstitute}
          handleCancel={HandleCancel}
        />
      ) : (
        <>
          <Command
            className="rounded-lg border shadow-md"
            filter={(value, search) => {
              if (value.toLowerCase().includes(search.toLowerCase())) {
                return 1;
              }
              return 0;
            }}
          >
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {/* <CommandGroup heading="A"> */}
              {institutes.map(({ _id, logo, name }) => (
                <CommandItem
                  onSelect={(value) => SelectHandler(value)}
                  value={name}
                  key={_id}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{name}</span>
                </CommandItem>
              ))}
              {/* TODO: try to render institutes filtered by Alphabets*/}
              {/* </CommandGroup> */}
              {/* <CommandSeparator />
          <CommandGroup heading="D">
            <CommandItem>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Delhi Technological University</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
            </CommandList>
          </Command>
          <ConfirmationDialog
            open={open}
            setOpen={setOpen}
            title="Warning!"
            description="This action cannot be undone. This will permanently delete Institute
            Info and remove there data from our servers."
            HandleCancel={HandleCancel}
            HandleDelete={HandleDelete}
          />
        </>
      )}
    </>
  );
}
