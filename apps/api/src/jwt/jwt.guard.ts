import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  HttpException,
  Inject,
  Injectable
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(@Inject(forwardRef(() => JwtService)) private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();

    const req: Request = ctx.getRequest();

    let token: string = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if(!token)
    token = ExtractJwt.fromUrlQueryParameter('token')(req);

    if (!token) {
      throw new HttpException("Unauthorized.", 403);
    }

    const { user }: any = this.jwt.verify(token);

    if (!user) {
      throw new HttpException("Unauthorized.", 403);
    }
    
    req["user"] = user;
    return true;
  }
}
