import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtGuard } from '@jwt/jwt.guard';
import { User } from '@jwt/user.decorator';
import { RESPONSE } from '@utils/constant';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('check-email')
  async check(@Req() req: Request) {
    return this.auth.check(req.body.email);
  }

  @Post('login')
  async login(@Req() req: Request) {
    const res = await this.auth.login(req.body, {
      ua: req.headers['user-agent'],
      ip: req.socket.remoteAddress,
    });
    return res.status
      ? Object.assign(RESPONSE.SUCCESS, { data: res })
      : Object.assign(RESPONSE.INVALID_REQUEST, { message: res.message });
  }

  @Post('register')
  async register(@Req() req: Request) {
    const res = await this.auth.register(req.body, {
      ua: req.headers['user-agent'],
      ip: req.socket.remoteAddress,
    });
    return res.status
      ? Object.assign(RESPONSE.SUCCESS, { data: res })
      : Object.assign(RESPONSE.INVALID_REQUEST, { message: res.message });
  }

  @UseGuards(JwtGuard)
  @Get('refresh-token')
  async refresh(@Req() req: Request, @User() user) {
    return this.auth.refresh({
      user: user,
      ua: req.headers['user-agent'],
      ip: req.socket.remoteAddress,
    });
  }

  @Post('password-hash')
  async password(@Body('password') password: string) {
    return this.auth.passwordHash(password);
  }
}
