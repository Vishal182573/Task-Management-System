"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserContext } from "@/global/userContext";
import { ScrollArea } from "../ui/scroll-area";
import { requestDeadlineExtension, respondDeadlineExtension } from "@/lib/api";
import { ADMIN, LG } from "@/global/constant";

export default function Comments({ taskId }: { taskId: string }) {
  const { user } = useUserContext();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "APJ",
      content: "Sir I want to extend task Deadline!",
      timestamp: "10:00 AM",
    },
    {
      id: 3,
      sender: "Alice",
      content: "There are some issues with vendor.",
      timestamp: "10:10 AM",
    },
  ]);

  const handleDeadline = async (
    type: "REQUEST" | "APPROVE" | "REJECT",
    days?: number
  ) => {
    try {
      let res;
      if (type === "REQUEST") {
        res = await requestDeadlineExtension(taskId, 5);
      } else {
        res = await respondDeadlineExtension(taskId, type);
      }

      if (res.ok) {
        alert("Request Sent!");
      } else {
        const { message } = await res.json();
        alert(message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-full py-8 px-8 shadow-sm mt-10 border rounded-md min-h-[500px]">
      <ScrollArea className="h-[420px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4  min-w-[200px] ${
              message.sender === "You" ? "flex justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.sender === "You" ? "justify-end text-right" : ""
              } flex flex-col gap-1`}
            >
              <p
                className={`${
                  message.sender === "You"
                    ? "bg-blue-500 text-white rounded-l-2xl"
                    : "bg-gray-100 rounded-r-2xl"
                }  rounded-b-lg min-w-[200px] max-w-[40vw] w-fit text-wrap border px-4 py-1`}
              >
                {message.content}
              </p>
              <span className="text-xs text-gray-400">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="mt-4 flex space-x-4">
        {user?.role !== LG && (
          <>
            {user?.role === ADMIN ? (
              <>
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                  onClick={() => handleDeadline("APPROVE")}
                >
                  {" "}
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                  onClick={() => handleDeadline("REJECT")}
                >
                  {" "}
                  Reject
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="border-primary text-primary"
                onClick={() => handleDeadline("REJECT")}
              >
                {" "}
                Request Deadline Extension
              </Button>
            )}
          </>
        )}
        <Input
          type="text"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
