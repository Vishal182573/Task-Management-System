import MailComponent from "@/components/shared/mail/components/mail";
import { accounts, mails } from "@/components/shared/mail/data";

export default function Notifications() {
  return (
    <div className="hidden flex-col md:flex">
      <MailComponent accounts={accounts} mails={mails} />
    </div>
  );
}
