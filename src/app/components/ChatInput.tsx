import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Options {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  handleSendMessage: (e: FormEvent) => void;
}

export default function ChatInput({
  inputValue,
  setInputValue,
  isLoading,
  handleSendMessage,
}: Options) {
  return (
    <form className="border-t bg-white p-4" onSubmit={handleSendMessage}>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !inputValue.trim()}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
}
