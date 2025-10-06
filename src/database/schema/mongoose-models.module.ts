import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const MODELS = [
  // { name: FOLDER_MODEL, schema: FolderSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
