import { useEffect, useRef } from "react";
import type { Message } from "@shared/schema";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  showQuickReplies: boolean;
  onQuickReply: (text: string) => void;
  disabled?: boolean;
}

export function ChatMessages({
  messages,
  isTyping,
  showQuickReplies,
  onQuickReply,
  disabled,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className="flex-1 bg-chat-background"
      data-testid="chat-messages-area"
    >
      <div 
        className="min-h-full p-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        {showQuickReplies && !isTyping && (
          <QuickReplies onSelect={onQuickReply} disabled={disabled} />
        )}
        
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
