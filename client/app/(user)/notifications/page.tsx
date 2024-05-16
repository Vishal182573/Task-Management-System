"use client"
import MailComponent from "@/components/shared/mail/components/mail";
import { type } from "os"


export default function Notifications() {

  return (
    <div className="hidden flex-col md:flex">
      <MailComponent />
    </div>
  );
}
