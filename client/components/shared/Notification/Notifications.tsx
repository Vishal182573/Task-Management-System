"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { getAllNotifications, getNotificationsByInstitute} from "@/lib/api";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components//ui/tabs";
import { TooltipProvider } from "@/components//ui/tooltip";
import { NotificationList } from "./NotificationList";
import { useUserContext } from "@/global/userContext";
import { Notification } from "@/global/types";
import { ADMIN, LG, NODALOFFICER, REPORTINGOFFICER } from "@/global/constant";

export default function NotificationsComponent() {
  const { user } = useUserContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend
        let data;
        if (user?.role === NODALOFFICER || user?.role === REPORTINGOFFICER) {
          data = await getNotificationsByInstitute(user?.institute);
        } else {
          data = await getAllNotifications();
        }

        // Update state with fetched data
        let reversedNotifications = data.reverse();

        setNotifications(reversedNotifications);
      } catch (error) {
        console.error("Error fetching Notifications:", error);
        // Handle error if needed
      }
    };
    fetchData();
  }, [user]);


  return (
    <TooltipProvider delayDuration={0}>
  <Tabs defaultValue="all" className="w-full">
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full sm:w-64">
        <form>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search" 
              className="pl-10 w-full"
            />
          </div>
        </form>
      </div>
      <TabsList className="bg-muted/50 p-1 rounded-full">
        <TabsTrigger
          value="all"
          className="rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          All mail
        </TabsTrigger>
        <TabsTrigger
          value="unread"
          className="rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Unread
        </TabsTrigger>
      </TabsList>
    </div>
    <Separator className="my-2" />
    <TabsContent value="all" className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <NotificationList items={notifications} />
    </TabsContent>
    <TabsContent value="unread" className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <NotificationList
        items={(Array.isArray(notifications) ? notifications : []).filter((item) => !item.isRead)}
      />
    </TabsContent>
  </Tabs>
</TooltipProvider>
  );
}
