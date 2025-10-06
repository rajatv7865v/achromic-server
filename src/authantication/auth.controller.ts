import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/modules/user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CustomHttpException } from 'src/core/exceptions';
import { SetPasswordDTO } from './dto/setPassword.dto';
import { LocalStrategy } from './strategies/local.strategy';
import { AdminSignupDto } from './dto/admin-signup.dto';
import * as bcrypt from 'bcrypt';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: 'User SignUp' })
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(
    @Body() userSignUpDTO: AdminSignupDto,
    @Res({ passthrough: true }) res: any,
    @Req() { user }: any,
  ) {
    try {
      

      // userSignUpDTO.password = await bcrypt.hash(userSignUpDTO.password, 10);
      await this.userService.createUser({ ...userSignUpDTO });
      const access_token = await this.authService.getJwtToken(user);

      const auth_token = {
        access_token,
      };

      res?.cookie('auth_token', auth_token, {
        httpOnly: false,
        secure: true,
        expires: new Date(Date.now() + 9000000000),
      });
      return {
        message: 'User SignUp Successfully!',
        auth_token,
        data: {
          id: user?.id,
          name: user?.username,
          email: user?.email,
          role: user?.role,
        },
      };
    } catch (error) {
      console.log('error in', error);
      throw new CustomHttpException(error.message);
    }
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: UserLoginDTO })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-In')
  async signIn(@Res({ passthrough: true }) res: any, @Req() { user }: any) {
    try {
      const access_token = await this.authService.getJwtToken(user);

      const auth_token = {
        access_token,
      };

      res?.cookie('auth_token', auth_token, {
        httpOnly: false,
        secure: true,
        expires: new Date(Date.now() + 9000000000),
      });
      return {
        message: 'User Login Successfully!',
        auth_token,
        data: {
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          isAdmin: user?.isAdmin,
        },
        userId: user?._id,
      };
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  @ApiOperation({ summary: 'Reset Password' })
  @Get('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Query('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @ApiOperation({ summary: 'Set Password' })
  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  setPassword(
    @Query('token') token: string,
    @Body() setPasswordDTO: SetPasswordDTO,
  ) {
    return this.authService.setPassword(token, setPasswordDTO);
  }
}
