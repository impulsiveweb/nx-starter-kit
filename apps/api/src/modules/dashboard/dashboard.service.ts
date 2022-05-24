import { Injectable } from '@nestjs/common';
import { ConfigService } from '@config';
import { User } from '@database/user.model';
import { getFilterParams } from '@utils/helpers';

@Injectable()
export class DashboardService {
  constructor(private config: ConfigService) {}

  async listUsers(body: any) {
    const params = getFilterParams(body, this.config.get('LIMIT'));
    return await User.findAndCountAll(params);
  }
}
