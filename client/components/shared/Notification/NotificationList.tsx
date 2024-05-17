import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/global/types";
import { updateNotificationReadStatus } from "@/lib/api";
import { useRouter } from "next/navigation";

export function NotificationList({ items }: { items: Notification[] }) {
  const router = useRouter();
  const handleClick = async (taskId: String, notificationId: string) => {
    try {
      const res = await updateNotificationReadStatus(notificationId);

      if (res.ok) {
        router.push(`/view-task/${taskId}`);
      }
    } catch (error) {
      console.error("Error fetching Notifications:", error);
      // Handle error if needed
    }
    // router.push(`/view-task/${taskId}`);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <div
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
            )}
            onClick={() => handleClick(item.taskId, item._id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.isRead && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className={cn("ml-auto text-xs font-semibold")}>
                  {item.institute}
                </div>
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description.substring(0, 300)}
            </div>
            <Badge className="p-1">{item.type}</Badge>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
