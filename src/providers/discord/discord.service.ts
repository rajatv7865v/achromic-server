import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class DiscordService {
  private webhookUrl: string;

  constructor() {
    // Replace this with your Discord webhook URL
    this.webhookUrl = "YOUR_DISCORD_WEBHOOK_URL";
  }

  async sendErrorMessage(message: string): Promise<void> {
    try {
      await axios.post(this.webhookUrl, {
        content: `🚨 Error Alert: ${message}`,
      });
    } catch (error) {
      console.error("Failed to send error message to Discord:", error);
    }
  }
}