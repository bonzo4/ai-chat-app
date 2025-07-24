interface Options {
  text: string;
  isUser?: boolean;
  timestamp?: string;
}

export function ChatBubble({ text, isUser = false, timestamp }: Options) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
          isUser
            ? "rounded-br-none bg-blue-500 text-white"
            : "rounded-bl-none bg-gray-200 text-gray-800"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        {timestamp && (
          <p
            className={`mt-1 text-xs ${isUser ? "text-blue-100" : "text-gray-500"}`}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
