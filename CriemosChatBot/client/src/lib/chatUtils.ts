import type { Message } from "@shared/schema";

const STORAGE_KEY = "criemos_chat_messages";
const SESSION_KEY = "criemos_session_id";

export function generateSessionId(): string {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `web_${randomPart}`;
}

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function saveMessages(messages: Message[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function loadMessages(): Message[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearMessages(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function createMessage(text: string, sender: "user" | "bot"): Message {
  return {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    text,
    sender,
    timestamp: new Date().toISOString(),
  };
}
