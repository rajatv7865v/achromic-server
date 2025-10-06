import { Module } from '@nestjs/common';
import { DiscordModule } from './discord/discord.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [DiscordModule, MailModule],
  controllers: [],
  providers: [],
})
export class ProvidersModule {}
