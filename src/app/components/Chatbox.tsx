"use client";
import { FormEvent, useState } from "react";
import { processMessage } from "../actions/processMessage";
import ChatInput from "./ChatInput";
import { Chat } from "@/lib/types";
import ChatHistory from "./ChatHistory";
import ChatHeader from "./ChatHeader";

export function ChatBox() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const message: Chat = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newChats = [...chats, message];
    setChats(newChats);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await processMessage({ inputValue, chatHistory: newChats });

      if (!data.ok) {
        throw Error("Failed fetching from endpoint.");
      }
      const aiResponse: Chat = {
        text: data.content,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChats((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Chat = {
        text: "Sorry, there was an error processing your message. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChats((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col">
      <ChatHeader />
      <ChatHistory chats={chats} isLoading={isLoading} />
      <div className="border-t bg-white p-4">
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
