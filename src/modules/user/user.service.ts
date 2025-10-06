import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL, UserDocument } from './entity/user.entity';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CustomHttpException } from 'src/core/exceptions';
import { AdminSignupDto } from 'src/authantication/dto/admin-signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private userModel: Model<UserDocument>,
  ) {}

  async findUser(email: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async createUser(
    userSignUpDTO: AdminSignupDto,
  ): Promise<UserDocument | null> {
    try {
      const user = new this.userModel({ ...userSignUpDTO });
      return await user.save();
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
