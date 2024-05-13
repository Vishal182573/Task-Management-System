import { Metadata } from "next";
import TaskInformation from "@/components/forms/TaskInfo";


export const metadata: Metadata = {
    title: "Task Information"
};
export default function TaskInfo() {
    
    return (
        <section className="h-full w-full flex justify-center px-40">
            <TaskInformation/>
        </section>
    );
}