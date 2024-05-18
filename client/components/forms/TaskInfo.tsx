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
  getOfficerInfo,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "@/lib/api";
import { useUserContext } from "@/global/userContext";
import {
  ADMIN,
  LG,
  INPROGRESS,
  DELAYED,
  COMPLETED,
  NODALOFFICER,
  REPORTINGOFFICER,
} from "@/global/constant";
import ConfirmationDialog from "../shared/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { Officer, Task } from "@/global/types";
import Image from "next/image";
import { Image as DummyProfile } from "lucide-react";

export default function TaskInformation({ taskId }: { taskId: string }) {
  const { user } = useUserContext();
  console.log(user);
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
            {(user?.role === NODALOFFICER ||
              user?.role === REPORTINGOFFICER) && (
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
      {(user?.role === ADMIN || user?.role === LG) && (
        <>
          <OfficerInformation officerType="Nodal Officer" taskId={taskId} />
          <OfficerInformation officerType="Reporting Officer" taskId={taskId} />
        </>
      )}
    </div>
  );
}

const OfficerInformation = ({
  officerType,
  taskId,
}: {
  officerType: string;
  taskId: string;
}) => {
  const [officer, setOfficer] = useState<Officer>({
    name: "",
    email: "",
    workingAddress: {
      house: "",
      street: "",
      state: "",
      postalCode: "",
      city: "",
    },
    contact: "",
    photographUri: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officer = await getOfficerInfo(taskId, officerType);
        // Update state with fetched data
        console.log(officer);
        setOfficer(officer);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error if needed
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full py-8 px-24 shadow-sm mt-10 border rounded-md min-h-[75px]">
      <div className="text-xl font-bold mb-6">{officerType} Details</div>
      <div className="grid grid-cols-3 gap-x-8 items-center">
        <div className="col-span-2">
          <div className="grid grid-cols-8 gap-y-4 items-center gap-x-4 justify-items-end">
            <Label
              htmlFor="name"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Officer Name"
              className="rounded-sm w-full col-span-7"
              value={officer?.name}
            />
            <Label
              htmlFor="email"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Officer Email"
              className="rounded-sm w-full col-span-7"
              value={officer?.email}
              readOnly
            />
            <Label
              htmlFor="contact"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              Contact
            </Label>
            <Input
              id="contact"
              type="text"
              placeholder="Officer Contact"
              className="rounded-sm w-full col-span-7"
              value={officer?.contact}
              readOnly
            />
            <Label
              htmlFor="house"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              House
            </Label>
            <Input
              id="house"
              type="text"
              placeholder="House"
              className="rounded-sm w-full col-span-3"
              value={officer?.workingAddress?.house}
              readOnly
            />
            <Label
              htmlFor="street"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              Street
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="Street"
              className="rounded-sm w-full col-span-3"
              value={officer?.workingAddress?.street}
              readOnly
            />
            <Label
              htmlFor="city"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              City
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="City"
              className="rounded-sm w-full col-span-3"
              value={officer?.workingAddress?.city}
              readOnly
            />
            <Label
              htmlFor="state"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              State
            </Label>
            <Input
              id="state"
              type="text"
              placeholder="State"
              className="rounded-sm w-full col-span-3"
              value={officer?.workingAddress?.state}
              readOnly
            />
            <Label
              htmlFor="postalCode"
              className="font-semibold mr-4 mt-1 col-span-1"
            >
              Postal Code
            </Label>
            <Input
              id="postalCode"
              type="text"
              placeholder="Postal Code"
              className="rounded-sm w-full col-span-3"
              value={officer?.workingAddress?.postalCode}
              readOnly
            />
          </div>
        </div>

        {/* Conditionally render the photograph if the role is Nodal Officer */}
        {officerType === "Nodal Officer" && (
          <>
            {" "}
            {false ? (
              <div className="col-span-1 flex justify-center items-center">
                <Image
                  src={officer?.photographUri}
                  alt="Officer Photograph"
                  className="rounded-lg w-32 h-32 border-black border-[1px]"
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              <div className="col-span-1 flex justify-center items-center">
                <DummyProfile className="rounded-lg w-32 h-32 border-black border-[1px]" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
