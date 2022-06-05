import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@config';
import { User } from '@database/user.model';
import { getFilterParams } from '@utils/helpers';
import { S3 } from 'aws-sdk';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(private config: ConfigService) {}

  getS3() {
    return new S3({
      accessKeyId: this.config.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('S3_SECRET_ACCESS_KEY'),
    });
  }

  async uploadS3(buffer, name) {
    const params = {
      Bucket: this.config.get('S3_BUCKET'),
      Key: this.config.get('S3_DIRECTORY') + name,
      Body: buffer,
    };
    const s3 = this.getS3();
    const res = await new Promise(function (resolve, reject) {
      s3.upload(params, function (err, data) {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
    return res;
  }

  async uploadFile(buffer, name) {
    const filePath = this.config.get('FILES_PATH');
    const path = join(filePath, name);
    const parts = path.split('/');
    parts.pop();
    const dir = parts.join('/');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.createWriteStream(path).write(buffer);
    return path;
  }

  async getResizedImage(buffer, type) {
    const image = await sharp(buffer);
    const metadata = await image.metadata();
    const width = metadata.width;
    const height = metadata.height;
    const newWidth = parseInt(this.config.get(type));
    const newHeight = Math.floor((height / width) * newWidth);
    if (width > newWidth || height > newHeight) {
      return sharp(buffer).resize(newWidth, newHeight).toBuffer();
    }
    return buffer;
  }

  async saveToDestination(buffer, fileName, id) {
    const storage = this.config.get('STORAGE');
    if (storage === 'S3' || storage === 'BOTH') {
      this.uploadS3(buffer, `${id}/${fileName}`);
    }
    if (storage === 'DISK' || storage === 'BOTH') {
      this.uploadFile(buffer, `${id}/${fileName}`);
    }
  }

  async upload(file) {
    const sizeBase = file.size;
    const extension = file.originalname.split('.').pop().toLowerCase();
    const name = file.originalname;
    const id = 1;
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      const large = await this.getResizedImage(
        file.buffer,
        'IMAGE_WIDTH_LARGE'
      );
      const medium = await this.getResizedImage(
        file.buffer,
        'IMAGE_WIDTH_MEDIUM'
      );
      const small = await this.getResizedImage(
        file.buffer,
        'IMAGE_WIDTH_SMALL'
      );
      this.saveToDestination(large, `large.${extension}`, id);
      this.saveToDestination(medium, `medium.${extension}`, id);
      this.saveToDestination(small, `small.${extension}`, id);
    } else if (file.mimetype === "'video/mp4'") {
      this.saveToDestination(file.buffer, `file.${extension}`, id);
      if (this.config.get('VIDEO_THUMBNAIL') === 'true') {
        // Generate Thumbnail
        console.log('generateThumbnail');
      }
    } else {
      this.saveToDestination(file.buffer, `file.${extension}`, id);
    }

    // const res = await this.uploadS3(file);

    // console.log('RES', res);
  }
}
