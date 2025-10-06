import { Module } from '@nestjs/common';
import { MagazineController } from './magzine.controller';
import { MagazineService } from './magzine.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MAGZINE_MODEL, MagzineSchema } from './entity/magzine.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MAGZINE_MODEL, schema: MagzineSchema }]),
  ],
  controllers: [MagazineController],
  providers: [MagazineService],
  exports: [MagazineService],
})
export class MagazineModule {}
