import { Module } from '@nestjs/common';
import { ImageuploadController } from './imageupload.controller';
import { ImageuploadService } from './imageupload.service';

@Module({
  controllers: [ImageuploadController],
  providers: [ImageuploadService],
  exports: [ImageuploadService],
})
export class ImageuploadModule {}
