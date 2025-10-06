import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  CustomHttpException,
  UnauthorizedException,
} from 'src/core/exceptions';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { SetPasswordDTO } from './dto/setPassword.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async resetPassword(email: string) {
    try {
      if (!email || !email.includes('@')) {
        throw new UnauthorizedException('Invalid Email!');
      }

      const user = await this.userService.findUser(email);
      if (!user) throw new UnauthorizedException('Email not Found!');

      const payload = {
        _id: user?.id,
        name: user?.name,
        email: user?.email,
      };

      const token = await this.getJwtToken(payload);

      return {
        message: 'Password Forgot Successfully!',
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async setPassword(token: string, setPasswordDTO: SetPasswordDTO) {
    const { password } = setPasswordDTO;
    try {
      const decoded = await this.jwtService.verify(token);
      if (!decoded) {
        throw new UnauthorizedException('Expire or Invalid !');
      }

      const user = await this.userService.findUser(decoded?.email);
      if (!user) throw new UnauthorizedException('User not Found!');

      return {
        message: 'Password Set Successfully!',
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  async getJwtToken(user: any): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

  async validRefreshToken(email: string, refreshToken: string): Promise<any> {
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    console.log(refreshToken);
    // const user = await this.userModel.findOne({
    //   email,
    //   // refreshToken,
    //   // refreshTokenExp: { $gte: currentDate },
    // });
    // console.log(user);

    // if (!user) {
    //   return null;
    // }

    // let currentUser = {
    //   _id: user?._id,
    //   name: user?.firstName + ' ' + user?.lastName,
    //   email: user?.email,
    // };

    return 'currentUser';
  }
}
