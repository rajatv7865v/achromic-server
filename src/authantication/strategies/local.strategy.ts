import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUser(email);

      if (!user) {
        throw new UnauthorizedException('Email not Found!');
      }
      console.log("user", user);
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch) {
        throw new UnauthorizedException('Password not matched!');
      }
      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        isAdmin: user?.role,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
