import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/chat", async (req, res) => {
    try {
      const parseResult = chatRequestSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({
          text: "Formato de mensaje inválido. Por favor intenta de nuevo.",
          error: parseResult.error.message,
        });
      }

      const { user_id, text, channel } = parseResult.data;
      const webhookUrl = storage.getWebhookUrl();

      if (!webhookUrl) {
        console.log("No webhook URL configured. Returning default response.");
        return res.json({
          text: `Gracias por tu mensaje: "${text}". 

Actualmente el webhook de n8n no está configurado. Para conectar con el asistente automatizado, configura la variable de entorno N8N_WEBHOOK_URL.

Mientras tanto, puedes:
- Ver mochilas: Tenemos modelos ergonómicos para recién nacidos hasta niños de 3 años
- Consultar envíos: Hacemos envíos a todo el país en 24-48 horas
- Hablar con asesor: Escríbenos a info@criemos.com`,
          quickReplies: ["Ver mochilas", "Consultar envíos", "Hablar con asesor"],
        });
      }

      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            text,
            channel,
          }),
        });

        if (!webhookResponse.ok) {
          console.error("Webhook response not OK:", webhookResponse.status);
          return res.json({
            text: "Disculpa, hubo un problema al procesar tu mensaje. Por favor intenta de nuevo.",
          });
        }

        const webhookData = await webhookResponse.json();
        
        return res.json({
          text: webhookData.text || webhookData.message || "Mensaje recibido. Te responderemos pronto.",
          quickReplies: webhookData.quickReplies || [],
        });
      } catch (fetchError) {
        console.error("Error calling webhook:", fetchError);
        return res.json({
          text: "Lo siento, no pude conectar con el servidor. Por favor intenta de nuevo en unos momentos.",
        });
      }
    } catch (error) {
      console.error("Chat endpoint error:", error);
      return res.status(500).json({
        text: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
      });
    }
  });

  return httpServer;
}
