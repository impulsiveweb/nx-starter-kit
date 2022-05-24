import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@config";
import { JwtModule as JwtRootModule, JwtSecretRequestType } from "@nestjs/jwt";
import { readFileSync } from "fs";

@Global()
@Module({
  imports: [
    JwtRootModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secretOrKeyProvider(type: JwtSecretRequestType) {
            switch (type) {
              case JwtSecretRequestType.SIGN:
                return readFileSync(config.get("JWT_PRIVATE_KEY"), "utf8");

              case JwtSecretRequestType.VERIFY:
                return readFileSync(config.get("JWT_PUBLIC_KEY"), "utf8");
            }
          },
          signOptions: {
            expiresIn: config.get("JWT_EXPIRY"),
            issuer: config.get("JWT_ISSUER"),
            algorithm: config.get("JWT_ALGORITHM")
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [],
  exports: [JwtRootModule]
})
export class JwtModule {}