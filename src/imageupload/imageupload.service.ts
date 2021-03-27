import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class ImageuploadService {
  async fileupload(@Req() req, @Res() res) {
    // console.log(req.files[0]);

    try {
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json('실패');
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json('실패2');
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 5);
}
