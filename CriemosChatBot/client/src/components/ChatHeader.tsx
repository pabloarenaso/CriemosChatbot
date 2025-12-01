import { ThemeToggle } from "./ThemeToggle";
import { Baby } from "lucide-react";

export function ChatHeader() {
  return (
    <header 
      className="bg-card border-b border-border px-4 py-3 flex items-center justify-between gap-4 shadow-sm"
      data-testid="chat-header"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Baby className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-lg leading-tight text-foreground" data-testid="text-brand-name">
            Criemos
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-subtitle">
            Asistente Virtual
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
