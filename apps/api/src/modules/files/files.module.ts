import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { AwsSdkModule } from "nest-aws-sdk";
import { Credentials } from "aws-sdk";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    
  ],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
