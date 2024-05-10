import CreateNewTask from "@/components/forms/CreateNewTask";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { MdManageAccounts } from "react-icons/md";

export const metadata: Metadata = {
  title: "Task Management - Dashboard",
};

export default function page() {
  return (
    <div className="px-8 py-2">
      <div className="grid grid-cols-6 gap-8">
        <Button className="w-full">
          <MdManageAccounts />
          &nbsp; Manage Institute
        </Button>
        <CreateNewTask />
      </div>
    </div>
  );
}
