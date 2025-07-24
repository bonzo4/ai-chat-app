import { ChatBubble } from "./ChatBubble";
import { Chat } from "@/lib/types";

interface ChatHistoryProps {
  chats: Chat[];
  isLoading: boolean;
}

export default function ChatHistory({ chats, isLoading }: ChatHistoryProps) {
  return (
    <div className="flex-1 space-y-2 overflow-y-auto p-4">
      {chats.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Start a conversation by typing a message below.</p>
          </div>
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
    </div>
  );
}
