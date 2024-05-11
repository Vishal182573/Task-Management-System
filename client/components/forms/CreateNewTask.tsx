"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoAddCircle } from "react-icons/io5";
import Combobox from "../shared/ComboBox";
import CalendarForm from "../shared/Calender";
import { Textarea } from "../ui/textarea";

export default function CreateNewTask() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IoAddCircle />
          &nbsp; Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              placeholder="Type your message here."
              className="w-full"
            />
            {/* <Input id="description" value="" className="col-span-3" /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Starting Date
            </Label>
            <CalendarForm />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              End Date
            </Label>
            <CalendarForm />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Combobox />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
