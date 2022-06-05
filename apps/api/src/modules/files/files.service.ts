import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@config';
import { File } from '@database/file.model';
import { S3 } from 'aws-sdk';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as genThumbnail from 'simple-thumbnail';
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
      const newBuffer = await sharp(buffer)
        .resize(newWidth, newHeight)
        .toBuffer();
      const image = await sharp(buffer);
      const metadata = await image.metadata();
      return {
        buffer: newBuffer,
        width: newWidth,
        height: newHeight,
        size: metadata.size,
      };
    }
    return {
      buffer,
      width,
      height,
      size: metadata.size,
    };
  }

  addUrls = (file) => {
    const urls = { disk: {}, bucket: {} };
    const STORAGE = this.config.get('STORAGE');
    const S3_URL = this.config.get('S3_URL');
    const S3_DIRECTORY = this.config.get('S3_DIRECTORY');
    const FILES_SERVE_ROOT = this.config.get('FILES_SERVE_ROOT');
    const FILES_BASE_URL = this.config.get('FILES_BASE_URL');

    const paths = file.paths.split(',');
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      if (STORAGE === 'S3' || STORAGE === 'BOTH') {
        urls.bucket['file'] = S3_URL + S3_DIRECTORY + paths[0];
        paths.forEach((f, i) => {
          urls.bucket[['large', 'medium', 'small'][i]] =
            S3_URL + S3_DIRECTORY + f;
        });
      }
      if (STORAGE === 'DISK' || STORAGE === 'BOTH') {
        urls.disk['file'] = FILES_BASE_URL + FILES_SERVE_ROOT + '/' + paths[0];
        paths.forEach((f, i) => {
          urls.disk[['large', 'medium', 'small'][i]] =
            FILES_BASE_URL + FILES_SERVE_ROOT + '/' + f;
        });
      }
    } if (file.mimetype === 'video/mp4') {
      if (STORAGE === 'S3' || STORAGE === 'BOTH') {
        urls.bucket['file'] = S3_URL + S3_DIRECTORY + paths[0];
        if(paths.length > 1){
          urls.bucket['thumb'] = S3_URL + S3_DIRECTORY + paths[1];
        }
      }
      if (STORAGE === 'DISK' || STORAGE === 'BOTH') {
        urls.disk['file'] = FILES_BASE_URL + FILES_SERVE_ROOT + '/' + paths[0];
        if(paths.length > 1){
          urls.disk['thumb'] = FILES_BASE_URL + FILES_SERVE_ROOT + '/' + paths[0];
        }
      }
    } else {
      urls.bucket['file'] = FILES_BASE_URL + FILES_SERVE_ROOT + '/' + paths[0];
    }
    file.urls = urls;
    return file;
  };

  async saveToDestination(buffer, fileName, id) {
    const storage = this.config.get('STORAGE');
    if (storage === 'S3' || storage === 'BOTH') {
      this.uploadS3(buffer, `${id}/${fileName}`);
    }
    if (storage === 'DISK' || storage === 'BOTH') {
      this.uploadFile(buffer, `${id}/${fileName}`);
    }
    return `${id}/${fileName}`;
  }

  async upload(file, user_id) {
    let sizeBase = file.size;
    const extension = file.originalname.split('.').pop().toLowerCase();
    const name = file.originalname;
    let paths = [];
    let width = null;
    let height = null;
    const fileRecord = await File.create({
      name: name,
      extension: extension,
      mimetype: file.mimetype,
      created_by: user_id,
    });
    const id = fileRecord.id;
    const VIDEO_THUMBNAIL = this.config.get('VIDEO_THUMBNAIL');
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      const large = await this.getResizedImage(
        file.buffer,
        'IMAGE_WIDTH_LARGE'
      );
      sizeBase = large.size;
      width = large.width;
      height = large.height;
      const medium = await this.getResizedImage(
        file.buffer,
        'IMAGE_WIDTH_MEDIUM'
      );
      const small = await this.getResizedImage(
        file.buffer,
        'IMAGE_WIDTH_SMALL'
      );
      const pathLarge = await this.saveToDestination(
        large.buffer,
        `large.${extension}`,
        id
      );
      const pathMedium = await this.saveToDestination(
        medium.buffer,
        `medium.${extension}`,
        id
      );
      const pathSmall = await this.saveToDestination(
        small.buffer,
        `small.${extension}`,
        id
      );
      paths = [pathLarge, pathMedium, pathSmall];
    } else if (file.mimetype === 'video/mp4' && VIDEO_THUMBNAIL) {
      const filePath = this.config.get('VIDEO_TEMP_PATH');
      const ts = Math.round(+new Date() / 1000);
      const tempName = ts + '.' + extension;
      const tempPath = join(filePath, tempName);
      const thumbPath = join(filePath, ts + '_thumb.png');
      let pathThumb = null;
      fs.createWriteStream(tempPath).write(file.buffer);
      try {
        await genThumbnail(tempPath, thumbPath, '1000x?');
        const thumbBuffer = fs.readFileSync(thumbPath);
        pathThumb = await this.saveToDestination(thumbBuffer, `thumb.png`, id);
      } catch (e) {
        console.error(e.message);
        Logger.error(e);
      }
      try {
        fs.unlinkSync(tempPath);
      } finally {
        // Nothing to do
      }
      try {
        fs.unlinkSync(thumbPath);
      } finally {
        // Nothing to do
      }
      const path = await this.saveToDestination(file.buffer, `file.${extension}`, id);
      paths = [path];
      if(pathThumb){
        paths.push(pathThumb);
      }
    } else {
      const path = await this.saveToDestination(
        file.buffer,
        `file.${extension}`,
        id
      );
      paths = [path];
    }
    const update = {
      size: sizeBase,
      width: width,
      height: height,
      paths: paths.join(','),
    };
    await File.update(update, { where: { id: id } });
    const f = await File.findByPk(id);
    return this.addUrls(f);
  }
}
