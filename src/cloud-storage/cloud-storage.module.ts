import { Module } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';
import { CloudStorageController } from './cloud-storage.controller';
@Module({
  providers: [CloudStorageService],
  controllers: [CloudStorageController],
  exports: [CloudStorageService],
})
export class CloudStorageModule {}
