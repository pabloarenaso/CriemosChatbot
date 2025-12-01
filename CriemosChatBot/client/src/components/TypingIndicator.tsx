export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-2" data-testid="typing-indicator">
      <div className="bg-bot-bubble text-bot-bubble-foreground px-4 py-3 rounded-lg rounded-bl-sm shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground mr-1">escribiendo</span>
          <span 
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-typing-dot" 
            style={{ animationDelay: "0ms" }}
          />
          <span 
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-typing-dot" 
            style={{ animationDelay: "150ms" }}
          />
          <span 
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-typing-dot" 
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
