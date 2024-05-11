"use client";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Button } from "../ui/button";
import { DELETE, UPDATE } from "@/contants";
import DialogCloseButton from "./DialogBox";

const institutes = [
  {
    id: 1,
    tasks: ["Task 1", "Task 2", "Task 3"],
    logo: "path/to/logo1.png",
    name: "Institute A",
  },
  {
    id: 2,
    tasks: ["Task 4", "Task 5", "Task 6"],
    logo: "path/to/logo2.png",
    name: "Institute B",
  },
  {
    id: 3,
    tasks: ["Task 7", "Task 8", "Task 9"],
    logo: "path/to/logo3.png",
    name: "Institute C",
  },
  {
    id: 4,
    tasks: ["Task 10", "Task 11", "Task 12"],
    logo: "path/to/logo4.png",
    name: "Institute D",
  },
  {
    id: 5,
    tasks: ["Task 13", "Task 14", "Task 15"],
    logo: "path/to/logo5.png",
    name: "Institute E",
  },
  {
    id: 6,
    tasks: ["Task 16", "Task 17", "Task 18"],
    logo: "path/to/logo6.png",
    name: "Institute F",
  },
  {
    id: 7,
    tasks: ["Task 19", "Task 20", "Task 21"],
    logo: "path/to/logo7.png",
    name: "Institute G",
  },
  {
    id: 8,
    tasks: ["Task 22", "Task 23", "Task 24"],
    logo: "path/to/logo8.png",
    name: "Institute H",
  },
  {
    id: 9,
    tasks: ["Task 25", "Task 26", "Task 27"],
    logo: "path/to/logo9.png",
    name: "Institute I",
  },
  {
    id: 10,
    tasks: ["Task 28", "Task 29", "Task 30"],
    logo: "path/to/logo10.png",
    name: "Institute J",
  },
];

export default function CommandDemo({ functionality }) {
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [open, setOpen] = useState(false);

  const SelectHandler = (id) => {
    setSelectedInstitute(id);
    if (functionality === UPDATE) {
    } else if (functionality === DELETE) {
      setOpen(true);
    }
    console.log("hi", selectedInstitute);
  };

  return (
    <>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="A">
            {institutes.map(({ id, logo, name }) => (
              <CommandItem
                onSelect={(value) => SelectHandler(value)}
                value={`${id}`}
                key={id}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="D">
            <CommandItem>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Delhi Technological University</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <DialogCloseButton open={open} setOpen={setOpen} />
    </>
  );
}
