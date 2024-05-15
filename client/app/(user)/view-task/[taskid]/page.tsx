import { Metadata } from "next";
import TaskInformation from "@/components/forms/TaskInfo";
import Comments from "@/components/shared/Comments";

export const metadata: Metadata = {
  title: "Task Management - View Task",
};

export default function ViewTask({ params }: { params: { taskid: string } }) {
  const { taskid } = params;
  return (
    <section className="h-full w-full flex justify-center px-24 flex-col">
      <TaskInformation taskId={taskid} />
      <Comments taskId={taskid} />
    </section>
  );
}
