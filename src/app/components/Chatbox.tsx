"use client";
import { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { processMessage } from "../actions/processMessage";
import ChatInput from "./ChatInput";

type Chat = {
  text: string;
  isUser: boolean;
  timestamp?: string;
};

export function ChatBox() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const message: Chat = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((prev) => [...prev, message]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await processMessage({ inputValue });

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
    <div className="mx-auto flex h-full max-w-4xl flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {chats.length === 0 ? (
          <div className="mt-8 text-center text-gray-500">
            <p>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          chats.map((chat, index) => (
            <ChatBubble
              key={index}
              text={chat.text}
              isUser={chat.isUser}
              timestamp={chat.timestamp}
            />
          ))
        )}
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="rounded-lg rounded-bl-none bg-gray-200 px-4 py-2 text-gray-800">
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
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
