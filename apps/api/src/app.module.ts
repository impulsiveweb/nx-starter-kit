import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { resolve } from "path";

import { LoggerModule } from "./logger/logger.module";
import { DatabaseModule } from "@database/database.module";
import { JwtModule } from "./jwt/jwt.module";
import { ExceptionFilter } from "./exception.filter";
import { AuthModule } from "./modules/auth/auth.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { FilesModule } from "./modules/files/files.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(__dirname, "../.env"),
    }),
    JwtModule,
    DatabaseModule,
    LoggerModule,
    AuthModule,
    DashboardModule,
    FilesModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    }
  ],
})
export class AppModule {}
