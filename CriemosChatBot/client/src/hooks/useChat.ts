import { useState, useEffect, useCallback } from "react";
import type { Message } from "@shared/schema";
import {
  getOrCreateSessionId,
  loadMessages,
  saveMessages,
  createMessage,
} from "@/lib/chatUtils";

const WELCOME_MESSAGE = "Hola! Soy el asistente de Criemos. En que puedo ayudarte?";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [sessionId] = useState(getOrCreateSessionId);

  useEffect(() => {
    const stored = loadMessages();
    if (stored.length > 0) {
      setMessages(stored);
      setShowQuickReplies(stored.length === 1 && stored[0].sender === "bot");
    } else {
      const welcomeMsg = createMessage(WELCOME_MESSAGE, "bot");
      setMessages([welcomeMsg]);
      saveMessages([welcomeMsg]);
      setShowQuickReplies(true);
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage = createMessage(text, "user");
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      saveMessages(newMessages);
      setShowQuickReplies(false);
      setIsTyping(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: sessionId,
            text,
            channel: "webchat",
          }),
        });

        if (!response.ok) {
          throw new Error("Error al enviar mensaje");
        }

        const data = await response.json();
        const botMessage = createMessage(
          data.text || "Lo siento, no pude procesar tu mensaje. Por favor intenta de nuevo.",
          "bot"
        );
        
        const updatedMessages = [...newMessages, botMessage];
        setMessages(updatedMessages);
        saveMessages(updatedMessages);
        
        if (data.quickReplies && data.quickReplies.length > 0) {
          setShowQuickReplies(true);
        }
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage = createMessage(
          "Disculpa, hubo un problema al conectar con el servidor. Por favor intenta de nuevo en unos momentos.",
          "bot"
        );
        const updatedMessages = [...newMessages, errorMessage];
        setMessages(updatedMessages);
        saveMessages(updatedMessages);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, sessionId]
  );

  const handleQuickReply = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return {
    messages,
    isTyping,
    showQuickReplies,
    sendMessage,
    handleQuickReply,
    sessionId,
  };
}
