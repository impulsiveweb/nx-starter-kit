import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtGuard } from '@jwt/jwt.guard';
import { RESPONSE } from '@utils/constant';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboard: DashboardService) {}

  @UseGuards(JwtGuard)
  @Post('list-users')
  async login(@Body() body: any, @Request() req: any) {
    const res = await this.dashboard.listUsers(body);
    return Object.assign(RESPONSE.SUCCESS, { data: res, user: req.user });
  }
}
