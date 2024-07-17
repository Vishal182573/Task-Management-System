"use client";
import { useUserContext } from "@/global/userContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { user } = useUserContext();

  useEffect(() => {
    if (user === null) {
      redirect("/login");
    } else {
      redirect("/task-management-dashboard");
    }
  }, []);

  return (
    <div className="h-screen w-full flex-center">
      Welcome to Task Management System!
    </div>
  );
}
