import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Notification {
  id:String,
  taskid: String,
  title: String,
  officer: String,
  description: String,
  status:String,
  isRead:Boolean,
  created:Date,
}

interface Props {
  items: Notification[];
}

export function MailList({ items }: Props) {

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <Link
            href={`/view-task/T-2479/${item.taskid}`}
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.officer}</div>
                  {!item.isRead && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                  )}
                >
                  {formatDistanceToNow(new Date(item.created), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description.substring(0, 300)}
            </div>
            {item.status.length ? (
              <div className="flex items-center gap-2">
                <Badge >
                    {item.status}
                  </Badge>
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}