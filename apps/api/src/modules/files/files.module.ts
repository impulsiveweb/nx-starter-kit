import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          rootPath: config.get('FILES_PATH'),
          serveRoot: config.get('FILES_SERVE_ROOT'),
        },
      ],
      inject: [ConfigService],
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
