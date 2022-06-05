import { Module } from '@nestjs/common';
import { ConfigService } from '@config';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '@database/user.model';
import { File } from '@database/file.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          dialect: 'mysql',
          host: config.get('MYSQL_HOST') || '127.0.0.1',
          port: config.get('MYSQL_PORT') || 3306,
          username: config.get('MYSQL_USERNAME') || 'root',
          password: config.get('MYSQL_PASSWORD') || '',
          database: config.get('MYSQL_NAME') || 'nx-starter-kit',
          autoLoadModels: true,
          models: [User, File],
          define: {
            timestamp: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: false,
            underscored: true,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
