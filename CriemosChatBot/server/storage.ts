export interface IStorage {
  getWebhookUrl(): string | undefined;
}

export class MemStorage implements IStorage {
  getWebhookUrl(): string | undefined {
    return process.env.N8N_WEBHOOK_URL;
  }
}

export const storage = new MemStorage();
