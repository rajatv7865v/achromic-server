import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { UserService } from 'src/modules/user/user.service';

const extractJwtFromCookie: JwtFromRequestFunction = (req: any) => {
  if (req.cookies && 'auth_token' in req.cookies) {
    return req.cookies['auth_token'].access_token;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: 'secret-key',
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload: any): Promise<any> {
    try {
      if (!payload) {
        throw new BadRequestException('Invalid jwt token');
      }
      const user = await this.userService.findUser(payload?.email);
      if (!user) throw new BadRequestException('Invalid jwt token');
      return payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
