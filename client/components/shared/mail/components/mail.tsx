"use client";

import * as React from "react";
import { useEffect,useState } from "react";
import { getAllNotifications ,getNotificationsByInstitute} from "@/lib/api";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components//ui/tabs";
import { TooltipProvider } from "@/components//ui/tooltip";
import { MailList } from "./mail-list";
import { useUserContext } from "@/global/userContext";
import { OFFICER } from "@/global/constant";

interface Notification {
  taskid: String,
  title: String,
  description: String,
  status:String,
  type:String,
  institute:String,
  isRead:Boolean,
  created:Date,
}

export default function MailComponent() {
  const { user } = useUserContext();
  const [Notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend
        let data;
        if(user?.role === OFFICER){
          data = await getNotificationsByInstitute(user?.address);
        }
        else{
          data = await getAllNotifications();
        }
        
        // Update state with fetched data
        setNotifications(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching Notifications:', error);
        // Handle error if needed
      }
    };
    fetchData();
  }, []);
  return (
    <TooltipProvider delayDuration={0}>
      <Tabs defaultValue="all">
        <div className="flex items-center px-4 py-2">
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
          <TabsList className="ml-auto">
            <TabsTrigger
              value="all"
              className="text-zinc-600 dark:text-zinc-200"
            >
              All mail
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Unread
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <TabsContent value="all" className="m-0">
          <MailList items={Notifications} />
        </TabsContent>
        <TabsContent value="unread" className="m-0">
          <MailList items={Notifications.filter((item) => !item.isRead)} />
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
}
