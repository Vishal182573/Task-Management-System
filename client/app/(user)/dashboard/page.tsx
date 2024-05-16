"use client";
import CreateNewTask from "@/components/forms/CreateNewTask";
import UserAlert from "@/components/shared/UserAlert";
import DashboardTable from "@/components/shared/table";
import { buttonVariants } from "@/components/ui/button";
import { ADMIN } from "@/global/constant";
import { useUserContext } from "@/global/userContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MdManageAccounts } from "react-icons/md";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Task Management - Dashboard",
// };

export default function page() {
  const { user } = useUserContext();

  // TODO: add xs breakpoint
  return (
    <div className="px-8 py-2">
      <UserAlert
        title="Coming soon!"
        description="Alerts to users after CRUD operations"
      />
      {user?.role === ADMIN && (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-6 gap-8">
          <Link href="/institute-registration" className={cn(buttonVariants())}>
            <MdManageAccounts />
            &nbsp; Institute Registration
          </Link>
          <CreateNewTask />
        </div>
      )}
      <DashboardTable />
    </div>
  );
}
