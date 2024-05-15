"use client";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { calculateDaysDifference } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Calendar from "@/components/shared/Calender";
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
import { cn } from "@/lib/utils";
import { getTaskById } from "@/lib/api";
import { useUserContext } from "@/global/userContext";
import { ADMIN, OFFICER } from "@/global/constant";
import ConfirmationDialog from "../shared/ConfirmationDialog";

export default function TaskInformation({ taskId }: { taskId: string }) {
  const { user } = useUserContext();
  const [askDelete, setAskDelete] = useState(false);
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    startingDate: null,
    endingDate: null,
    status: "",
    assignedTo: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTaskById(taskId);
      setTaskInfo(task);
    };

    fetchTask();
  }, []);

  const HandleCancel = () => {
    setAskDelete(false);
  };
  const HandleDelete = () => {};

  return (
    <div className="w-full py-8 px-24 shadow-sm mt-10 border rounded-md min-h-[500px]">
      <div className=" w-full grid grid-cols-8 gap-x-24 items-center gap-y-4">
        <Label htmlFor="taskname" className="w-20 col-span-1 font-semibold">
          Task Name
        </Label>
        <Input
          id="taskname"
          type="taskname"
          placeholder=""
          className="rounded-sm w-[412px] col-span-3"
          value={taskInfo?.title}
        />
        <div className="grid grid-cols-3 items-center justify-self-end gap-y-2 gap-x-8 col-span-4">
          <Label htmlFor="assignee" className="col-span-1 font-semibold">
            Status
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`col-span-2 ${cn(
                buttonVariants({ variant: "outline" })
              )}`}
            >
              {taskInfo?.status}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem itemID="INPROGRESS">
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem itemID="TODO">TODO</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Label htmlFor="assignee" className="col-span-1 font-semibold">
            Assignee
          </Label>
          <p
            className={`${cn(
              buttonVariants({ variant: "outline" })
            )} col-span-2 text-center`}
          >
            {taskInfo?.assignedTo}
          </p>
        </div>
        <Label htmlFor="taskname" className="w-20 col-span-1 font-semibold">
          Description
        </Label>
        <Textarea
          className="resize-none h-20 w-[412px] rounded-sm  col-span-3"
          value={taskInfo.description}
        />
        <div className="col-span-4"></div>
        <Label
          htmlFor=""
          className="col-span-1 text-nowrap w-fit font-semibold"
        >
          Start Date
        </Label>
        <Calendar
          defaultDate={
            taskInfo.startingDate !== null ? taskInfo.startingDate : undefined
          }
          handler={() => {}}
          className="col-span-2"
        />
        <div className="col-span-5"></div>
        <Label
          htmlFor=""
          className="col-span-1 text-nowrap w-fit font-semibold"
        >
          End Date
        </Label>
        <Calendar
          defaultDate={
            taskInfo.endingDate !== null ? taskInfo.endingDate : undefined
          }
          handler={() => {}}
          className="col-span-2"
        />
      </div>
      {taskInfo.endingDate !== null &&
        calculateDaysDifference(new Date(), taskInfo.endingDate) > 0 && (
          <>
            <Label htmlFor="" className="col-span-1 font-semibold">
              Days Exceeded
            </Label>
            <Input
              value={`${calculateDaysDifference(
                new Date(),
                taskInfo.endingDate
              )} Day${
                calculateDaysDifference(new Date(), taskInfo.endingDate) > 1
                  ? "s"
                  : ""
              }`}
              placeholder=""
              className="rounded-sm w-fit col-span-1"
              disabled={true}
            />
            {user?.role === OFFICER && (
              <Button className="col-span-1">Request Deadline Extension</Button>
            )}
          </>
        )}

      {user?.role === ADMIN && (
        <div className="p-2  flex space-x-10 justify-end items-center my-4 ">
          <div>
            <ConfirmationDialog
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete
                    this task from server."
              HandleCancel={HandleCancel}
              HandleDelete={HandleDelete}
              open={askDelete}
              setOpen={setAskDelete}
            />
          </div>
          <Button variant="destructive" onClick={() => setAskDelete(true)}>
            Delete
          </Button>
          <Button className="w-24">Update</Button>
        </div>
      )}
    </div>
  );
}
