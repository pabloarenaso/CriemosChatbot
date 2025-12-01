import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className="bg-card border-t border-border px-3 py-3 flex items-center gap-2"
      data-testid="chat-input-container"
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un mensaje..."
        disabled={disabled}
        className="flex-1 bg-muted border-0 rounded-full px-4"
        data-testid="input-message"
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        size="icon"
        className="rounded-full shrink-0"
        data-testid="button-send"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
}
