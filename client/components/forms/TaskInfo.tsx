"use client";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { calculateDaysDifference, dateFormatter } from "@/lib/utils";
import Calendar from "@/components/shared/Calender";
import { cn } from "@/lib/utils";
import {
  deleteTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "@/lib/api";
import { useUserContext } from "@/global/userContext";
import {
  ADMIN,
  OFFICER,
  LG,
  INPROGRESS,
  DELAYED,
  COMPLETED,
} from "@/global/constant";
import ConfirmationDialog from "../shared/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { Task } from "@/global/types";

export default function TaskInformation({ taskId }: { taskId: string }) {
  const { user } = useUserContext();
  const [askDelete, setAskDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  const [taskInfo, setTaskInfo] = useState<Task>({
    title: "",
    description: "",
    startingDate: undefined,
    endingDate: undefined,
    status: INPROGRESS,
    assignedTo: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTaskById(taskId);
      setTaskInfo({ ...task });
    };

    fetchTask();
  }, []);

  const HandleCancel = () => {
    setAskDelete(false);
  };

  const HandleChange = (e: any) => {
    setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value });
    setUpdate(true);
  };

  const HandleDelete = async () => {
    try {
      const res = await deleteTask(taskId);
      if (res.ok) {
        alert("Task deleted successfully!");
        router.push("/dashboard");
      }

      // TODO: What if res.ok == false
    } catch (error: any) {
      alert(error.message);
    }
  };

  const StartingDateHandler = (date: Date | undefined) => {
    setUpdate(true);
    setTaskInfo({ ...taskInfo, startingDate: date });
  };
  const EndingDateHandler = (date: Date | undefined) => {
    setUpdate(true);
    setTaskInfo({ ...taskInfo, endingDate: date });
  };

  const HandleUpdate = async () => {
    try {
      const res = await updateTask(taskInfo);

      if (res.message) {
        alert(res.message);
      } else {
        alert("Task updated successfully!");
        setTaskInfo({ ...taskInfo, ...res.updatedTask });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (
      (status === INPROGRESS || status === COMPLETED || status === DELAYED) &&
      taskInfo.taskId !== undefined
    ) {
      try {
        const res = await updateTaskStatus(taskInfo.taskId, status);

        if (!res.updated) {
          alert(res?.message);
        } else {
          alert("Status updated successfully!");
          setTaskInfo({ ...taskInfo, status });
        }
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  console.log(taskInfo?.status);
  return (
    <div className="w-full py-8 px-24 shadow-sm mt-10 border rounded-md min-h-[500px]">
      <div className=" w-full grid grid-cols-8 gap-x-24 items-center gap-y-4">
        <Label htmlFor="taskname" className="w-20 col-span-1 font-semibold">
          Task Name
        </Label>
        {user?.role === ADMIN ? (
          <Input
            placeholder=""
            id="taskName"
            name="title"
            className="rounded-sm w-[412px] col-span-3"
            value={taskInfo?.title}
            onChange={HandleChange}
          />
        ) : (
          <p
            className={`${cn(
              buttonVariants({ variant: "outline" })
            )} col-span-3 text-left`}
          >
            {taskInfo?.title}
          </p>
        )}
        <div className="grid grid-cols-3 items-center justify-self-end gap-y-2 gap-x-8 col-span-4">
          <Label htmlFor="status" className="col-span-1 font-semibold">
            Status
          </Label>
          {user?.role === "OFFICER" ? (
            <select
              name="status"
              id="status"
              className={`col-span-2 disabled:text-black disabled:border ${cn(
                buttonVariants({ variant: "outline" })
              )}`}
              value={`${taskInfo?.status}`}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="DELAYED" className="p-1 border" id="DELAYED">
                DELAYED
              </option>
              <option
                value="IN-PROGRESS"
                className="p-1 border"
                id="IN-PROGRESS"
              >
                IN PROGRESS
              </option>
              <option value="COMPLETED" className="p-1 border" id="COMPLETED">
                COMPLETED
              </option>
            </select>
          ) : (
            <p
              className={`${cn(
                buttonVariants({ variant: "outline" })
              )} col-span-2 text-center`}
            >
              {taskInfo?.status}
            </p>
          )}
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

        <Label htmlFor="description" className="w-20 col-span-1 font-semibold">
          Description
        </Label>
        {user?.role === ADMIN ? (
          <Textarea
            id="description"
            name="description"
            className="resize-none h-20 w-[412px] rounded-sm  col-span-3"
            value={taskInfo.description}
            onChange={HandleChange}
          />
        ) : (
          <p
            className={`${cn(
              buttonVariants({ variant: "outline" })
            )} col-span-3 text-wrap min-h-24 p-1`}
          >
            {taskInfo?.description}
          </p>
        )}
        <div className="col-span-4"></div>
        <Label
          htmlFor=""
          className="col-span-1 text-nowrap w-fit font-semibold"
        >
          Start Date
        </Label>
        {user?.role === ADMIN ? (
          <Calendar
            defaultDate={
              taskInfo.startingDate !== null ? taskInfo.startingDate : undefined
            }
            handler={StartingDateHandler}
            className="col-span-2"
          />
        ) : (
          <p
            className={`${cn(
              buttonVariants({ variant: "outline" })
            )} col-span-2`}
          >
            {dateFormatter(taskInfo?.startingDate || new Date())}
          </p>
        )}
        <div className="col-span-5"></div>
        <Label
          htmlFor=""
          className="col-span-1 text-nowrap w-fit font-semibold"
        >
          End Date
        </Label>
        {user?.role === ADMIN ? (
          <Calendar
            defaultDate={
              taskInfo.endingDate !== null ? taskInfo.endingDate : undefined
            }
            handler={EndingDateHandler}
            className="col-span-2"
          />
        ) : (
          <p
            className={`${cn(
              buttonVariants({ variant: "outline" })
            )} col-span-2`}
          >
            {dateFormatter(taskInfo?.endingDate || new Date())}
          </p>
        )}
      </div>
      {taskInfo.endingDate !== null &&
        calculateDaysDifference(new Date(), taskInfo.endingDate || new Date()) >
          0 && (
          <>
            <Label htmlFor="" className="col-span-1 font-semibold">
              Days Exceeded
            </Label>
            <Input
              value={`${calculateDaysDifference(
                new Date(),
                taskInfo.endingDate || new Date()
              )} Day${
                calculateDaysDifference(
                  new Date(),
                  taskInfo.endingDate || new Date()
                ) > 1
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

          {update && (
            <Button className="w-24" onClick={HandleUpdate}>
              Update
            </Button>
          )}
          <Button variant="destructive" onClick={() => setAskDelete(true)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
