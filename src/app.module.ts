import { Module } from '@nestjs/common';
import { ImageuploadModule } from './imageupload/imageupload.module';

@Module({
  imports: [ImageuploadModule],
})
export class AppModule {}
