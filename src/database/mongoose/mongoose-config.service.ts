import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE.USER');
    const password = this.config.get('DATABASE.PASSWORD');
    const databaseName = this.config.get('DATABASE.NAME');

    const uri = process.env.MONGO_URI;
    return {
      uri,
    };
  }
}
