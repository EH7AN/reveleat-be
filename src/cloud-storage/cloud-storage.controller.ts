import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudStorageService } from './cloud-storage.service';

@Controller('storage')
export class CloudStorageController {
  constructor(private readonly cloudStorageService: CloudStorageService) {}

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const url = await this.cloudStorageService.uploadFile(
        file.buffer,
        file.originalname,
        'images',
      );
      return { url };
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}
