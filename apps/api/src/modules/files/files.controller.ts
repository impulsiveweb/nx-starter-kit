import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtGuard } from '@jwt/jwt.guard';
import { RESPONSE } from '@utils/constant';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private files: FilesService) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Request() req: any) {
    const { user } = req;
    const res = await this.files.upload(file, user.id);
    return Object.assign(RESPONSE.SUCCESS, { data: res });
  }
}
