import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@config';
import { User } from '@database/user.model';
import { getFilterParams } from '@utils/helpers';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class FilesService {
  constructor(private config: ConfigService) {}

  getS3() {
    return new S3({
        accessKeyId: this.config.get('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('S3_SECRET_ACCESS_KEY'),
    });
  }

  async listUsers(body: any) {
    const params = getFilterParams(body, this.config.get('LIMIT'));
    return await User.findAndCountAll(params);
  }

  async uploadS3(file) {
    const params = {
      Bucket: this.config.get('S3_BUCKET'),
      Key: this.config.get('S3_DIRECTORY')+"hello.jpg",
      Body: file.buffer,
    };
    const s3 = this.getS3();
    const res = await new Promise(function(resolve, reject) {
      s3.upload(params, function(err, data) {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      })
    });
    return res;
  }

  async upload(file){

  
    const res = await this.uploadS3(file);

    
    console.log('RES', res);
  }
}
