import type { Message } from "@shared/schema";
import { formatTime } from "@/lib/chatUtils";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  
  return (
    <div
      className={cn(
        "flex w-full mb-2",
        isUser ? "justify-end" : "justify-start"
      )}
      data-testid={`message-bubble-${message.id}`}
    >
      <div
        className={cn(
          "max-w-[85%] md:max-w-[70%] px-3 py-2 rounded-lg relative shadow-sm",
          isUser 
            ? "bg-user-bubble text-user-bubble-foreground rounded-br-sm" 
            : "bg-bot-bubble text-bot-bubble-foreground rounded-bl-sm"
        )}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words" data-testid={`text-message-${message.id}`}>
          {message.text}
        </p>
        <div className={cn(
          "flex items-center gap-1 mt-1",
          isUser ? "justify-end" : "justify-start"
        )}>
          <span className="text-[11px] text-muted-foreground" data-testid={`text-timestamp-${message.id}`}>
            {formatTime(message.timestamp)}
          </span>
          {isUser && (
            <Check className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
}
