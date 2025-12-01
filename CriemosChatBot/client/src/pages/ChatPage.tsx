import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessages } from "@/components/ChatMessages";
import { ChatInput } from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";

export function ChatPage() {
  const { messages, isTyping, showQuickReplies, sendMessage, handleQuickReply } = useChat();

  return (
    <div 
      className="flex flex-col h-screen w-full max-w-4xl mx-auto bg-card shadow-2xl"
      data-testid="chat-container"
    >
      <ChatHeader />
      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        showQuickReplies={showQuickReplies}
        onQuickReply={handleQuickReply}
        disabled={isTyping}
      />
      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
