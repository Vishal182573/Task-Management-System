import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";

interface CustomAlertProps {
  title: string;
  description: string;
}

// TODO: implement user alerts: alerts to users after CRUD operations
export default function UserAlert({ title, description }: CustomAlertProps) {
  return (
    <Alert className="absolute w-96 right-4">
      <Button className="absolute right-0 top-0" variant="ghost">
        <RxCross1 />
      </Button>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
