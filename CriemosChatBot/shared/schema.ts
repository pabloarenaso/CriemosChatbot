import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.enum(["user", "bot"]),
  timestamp: z.string(),
});

export const chatRequestSchema = z.object({
  user_id: z.string(),
  text: z.string(),
  channel: z.literal("webchat"),
});

export const chatResponseSchema = z.object({
  text: z.string(),
  quickReplies: z.array(z.string()).optional(),
});

export type Message = z.infer<typeof messageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;

export const quickReplyOptions = [
  "Ver mochilas",
  "Consultar envíos", 
  "Hablar con asesor"
] as const;

export type QuickReplyOption = typeof quickReplyOptions[number];
