import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@config";
import { User } from "@database/user.model";
import { checkHash, toHash } from "@utils/helpers";
import { ROLES } from "@utils/constant";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService)) private readonly jwt: JwtService,
    private config: ConfigService
  ) {}

  private getTokens(user: any, ip: string, ua: string) {
    const payload: any = {
      ua,
      ip,
      user: {
        id: user.id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        mobile: user.mobile
      },
    };
    console.log('payload', payload);
    const token: string = this.jwt.sign(payload);
    const refreshToken: string = this.jwt.sign(payload, {
      expiresIn: this.config.get("JWT_REFRESH_EXPIRY"),
    });

    return {
      token,
      refreshToken,
    };
  }

  async validate(email: string, password: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isValid = await checkHash(password, user.password);

    if (isValid) {
      delete user.password;
      return user;
    }

    return null;
  }

  async check(email: string) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return {
        status: 0,
        message: "Email ID does not exists.",
      };
    }

    return {
      status: 1,
      message: "Email ID exists.",
    };
  }

  async passwordHash(password: string) {
    const hash: string = await toHash(password);
    return {
      password: password,
      hash: hash,
    };
  }

  async login({ email, password }: any, { ip, ua }: any) {
    const user = await this.validate(email, password);

    if (!user) {
      return {
        status: 0,
        message: "Invalid Credentials.",
      };
    }

    if (!user.status) {
      return {
        status: 0,
        message: "Account blocked",
      };
    }
    
    return {
      status: 1,
      ...this.getTokens(user, ip, ua),
      user
    };
  }

  async register(data: any, { ip, ua }) {
    const user: User = await User.findOne({
      where: { email: data.email },
    });

    if (user) {
      return {
        message: 'Email already exist',
        status: 0,
      };
    }

    const hash: string = await toHash(data.password);
    console.log("HASH", hash);
    const created = await User.create({
      first_name: data.first_name,
      last_name: data.first_name,
      email: data.email,
      mobile: data.mobile,
      password: hash,
      role: ROLES.ADMIN,
      status: 1
    });

    return {
      ...this.getTokens(created, ip, ua),
      user: created,
      status: true,
    };
  }

  async checkEmail(email: string) {
    return User.findOne({
      where: { email },
    });
  }

  async refresh({ ip, ua, ...user }: any) {
    return this.getTokens(user, ip, ua);
  }
  
}
