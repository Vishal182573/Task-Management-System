import { Metadata } from "next";
import TaskInformation from "@/components/forms/TaskInfo";

export const metadata: Metadata = {
  title: "Task Management - View Task",
};

export default function ViewTask({ params }: { params: { taskid: string } }) {
  const { taskid } = params;
  return (
    <section className="h-full w-full flex justify-center px-24">
      <TaskInformation taskId={taskid} />
    </section>
  );
}
