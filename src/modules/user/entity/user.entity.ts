import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: String })
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  this.email = this.email.toLowerCase();
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.index({ email: 1 }, { unique: true });

export const USER_MODEL = User.name;
