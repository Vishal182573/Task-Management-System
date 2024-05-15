"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoAddCircle } from "react-icons/io5";
import Calendar from "../shared/Calender";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { INPENDING } from "@/global/constant";
import { Task } from "@/global/types";
import ShowInstitutesDialog from "../shared/ShowInstitutesDialog";
import { createNewTask } from "@/lib/api";

const formDataInit = {
  title: "",
  description: "",
  startingDate: undefined,
  endingDate: undefined,
  assignedTo: "",
};

export default function CreateNewTask() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Task>({
    ...formDataInit,
    status: INPENDING,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      startingDate: date,
    }));
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      endingDate: date,
    }));
  };

  const handleOptionChange = (option: string) => {
    setFormData((prevState) => ({
      ...prevState,
      assignedTo: option,
    }));
  };

  const handleCancel = () => {
    setFormData({ ...formDataInit, status: INPENDING });
    setOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createNewTask(formData);

      // Reset form after successful submission
      handleCancel();
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IoAddCircle />
          &nbsp; Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
              />
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Type your message here."
                className="w-full col-span-3"
              />
              <Label htmlFor="startDate" className="text-right">
                Starting Date
              </Label>
              <Calendar
                defaultDate={formData.startingDate}
                handler={handleStartDateChange}
                className="col-span-3"
              />
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Calendar
                defaultDate={formData.endingDate}
                handler={handleEndDateChange}
                className="col-span-3"
              />
              <Label htmlFor="endDate" className="text-right">
                Select Institute
              </Label>
              <ShowInstitutesDialog
                selectedInstitute={formData.assignedTo}
                handleOptionChange={handleOptionChange}
              />
            </div>
          </div>
          <DialogFooter className="">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
