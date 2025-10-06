import { Inject, Module } from '@nestjs/common';
import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SPEAKER_MODEL, SpeakerSchema } from './entity/speaker.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SPEAKER_MODEL, schema: SpeakerSchema }]),
  ],
  controllers: [SpeakerController],
  providers: [SpeakerService],
})
export class SpeakerModule {}
