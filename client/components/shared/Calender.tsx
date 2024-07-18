"use client";

import { CalendarIcon } from "@radix-ui/react-icons";

import { cn, dateFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function CalendarComponent({
  defaultDate,
  handler,
  className,
}: {
  defaultDate: Date | undefined;
  handler: (date: Date | undefined) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const dateHandler = (date: Date | undefined) => {
    handler(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !defaultDate && "text-muted-foreground",
            className
          )}
          // onClick={() => setOpen(true)}
        >
          {defaultDate ? dateFormatter(defaultDate) : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={defaultDate}
          onSelect={(date) => dateHandler(date)}
          // disabled={(date: Date) =>
          //   date < new Date() || date < new Date("1900-01-01")
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
