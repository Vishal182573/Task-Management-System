"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserContext } from "@/global/userContext";
import { ScrollArea } from "../ui/scroll-area";
import { requestDeadlineExtension, respondDeadlineExtension, getComments, sendMessage, getTaskById } from "@/lib/api";
import { ADMIN, LG, NODALOFFICER } from "@/global/constant";

interface Comment {
  _id: string;
  userId: string;
  name: string;
  comment: string;
  created: string;
}

interface CommentsProps {
  taskId: string;
}

export default function Comments({ taskId }: CommentsProps) {
  const { user } = useUserContext();

  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Comment[]>([]);
  const [taskInfo, setTaskInfo] = useState<any>(null);
  const [extensionDays, setExtensionDays] = useState<number>(5);

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getComments(taskId);
        setMessages(data.comments);
      } catch (error: any) {
        alert(error.message);
      }
    }

    async function fetchTask() {
      try {
        const task = await getTaskById(taskId);
        setTaskInfo(task);
      } catch (error: any) {
        alert(error.message);
      }
    }

    fetchComments();
    fetchTask();
  }, [taskId]);

  const handleDeadline = async (type: "REQUEST" | "APPROVE" | "REJECT") => {
    try {
      let res;
      if (type === "REQUEST") {
        res = await requestDeadlineExtension(taskId, extensionDays);
      } else {
        res = await respondDeadlineExtension(taskId, type);
      }
      if (res.ok) {
        alert("Request Sent!");
        // Refresh task info after request
        const updatedTask = await getTaskById(taskId);
        setTaskInfo(updatedTask);
      } else {
        const { message } = await res.json();
        alert(message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        userId: user?.userId,
        name: user?.name,
        comment: newMessage,
        created: new Date().toISOString(),
      };
  
      try {
        await sendMessage(taskId, user?.userId!, user?.name!, newMessage);
        setMessages([...messages, newMessageObj]);
        setNewMessage("");
      } catch (error:any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="w-full py-6 px-6 shadow-sm mt-8 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <ScrollArea className="h-[400px] pr-4">
        {messages.map((message) => (
          <div key={message._id} className="mb-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold mr-3">
                {message.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm">{message.name}</span>
                  <span className="text-xs text-gray-500">{new Date(message.created).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-700">{message.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="mt-6">
        {taskInfo && taskInfo.request && (user?.role === ADMIN ) && (
          <div className="mb-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50"
                onClick={() => handleDeadline("APPROVE")}
              >
                Approve Extension
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => handleDeadline("REJECT")}
              >
                Reject Extension
              </Button>
            </div>
            <div className="font-bold text-sm mr-3">{`Reqest for extension of deadline for ${taskInfo.extension} days`}</div>
          </div>
        )}
        {user?.role === NODALOFFICER && (
          <div className="mb-4">
            <div className="flex space-x-2">
              <Input
                type="number"
                className="w-24"
                placeholder="Days"
                value={extensionDays}
                onChange={(e) => setExtensionDays(Number(e.target.value))}
              />
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
                onClick={() => handleDeadline("REQUEST")}
              >
                Request Deadline Extension
              </Button>
            </div>
          </div>
        )}
        <div className="flex space-x-2">
          <Input
            type="text"
            className="flex-1"
            placeholder="Add a comment..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}