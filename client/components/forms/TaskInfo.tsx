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
import CalendarForm from "@/components/shared/Calender";
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

export default function TaskInformation({ taskId }: { taskId: string }) {
  const { user } = useUserContext();
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

  return (
    <div className="w-full py-8 px-24 shadow-sm mt-10 border rounded-md min-h-[500px]">
      <div className=" w-full flex justify-between items-center ">
        <div className="flex space-x-4 justify-center items-center">
          <Label htmlFor="taskname" className="w-20">
            Task Name:
          </Label>
          <Input
            id="taskname"
            type="taskname"
            placeholder=""
            className="rounded-sm w-[412px]"
            value={taskInfo?.title}
          />
        </div>
        <div className="flex space-x-4 justify-center items-center">
          <Label htmlFor="assignee">Assignee: </Label>
          <Input value={taskInfo?.assignedTo} />
        </div>
      </div>
      <div className=" w-full flex justify-start items-center my-4 space-x-2">
        <Label htmlFor="taskname" className="w-20">
          Description:
        </Label>
        <Textarea
          className="resize-none h-20 w-[412px] rounded-sm "
          value={taskInfo.description}
        />
      </div>
      <div className="flex items-center space-x-20 my-4">
        <Label htmlFor="">Start Date</Label>
        <CalendarForm
          date={
            taskInfo.startingDate !== null ? taskInfo.startingDate : undefined
          }
        />
      </div>
      <div className="flex items-center space-x-20 my-4">
        <Label htmlFor="">End Date</Label>
        <CalendarForm
          date={taskInfo.endingDate !== null ? taskInfo.endingDate : undefined}
        />
      </div>
      <div className="flex  items-center space-x-20 my-4">
        {taskInfo.endingDate !== null &&
          calculateDaysDifference(new Date(), taskInfo.endingDate) > 0 && (
            <>
              <Label htmlFor="">Days Exceeded</Label>
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
                className="rounded-sm w-fit"
                disabled={true}
              />
              {user?.role === OFFICER && (
                <Button>Request Deadline Extension</Button>
              )}
            </>
          )}
      </div>
      <div className="flex space-x-4 items-center">
        <Label htmlFor="assignee">Status: </Label>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {taskInfo?.status}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem itemID="INPROGRESS">In Progress</DropdownMenuItem>
            <DropdownMenuItem itemID="TODO">TODO</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {user?.role === ADMIN && (
        <div className="p-2  flex space-x-10 justify-end items-center my-4 ">
          <div>
            <AlertDialog>
              <AlertDialogTrigger className={cn(buttonVariants())}>
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this task from server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Button className="w-24 bg-green-700">Save</Button>
        </div>
      )}
    </div>
  );
}
