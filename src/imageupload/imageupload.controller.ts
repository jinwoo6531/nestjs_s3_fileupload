import { Controller, Post, Req, Res } from '@nestjs/common';

import { ImageuploadService } from './imageupload.service';

@Controller('imageupload')
export class ImageuploadController {
  constructor(private readonly imageUploadService: ImageuploadService) {}

  @Post()
  async createPost(@Req() req, @Res() res) {
    try {
      await this.imageUploadService.fileupload(req, res);
    } catch (error) {
      console.error(error);
      return req
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
