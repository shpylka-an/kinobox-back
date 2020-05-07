import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
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
export class S3UploadService {
  private upload = multer({
    storage: multerS3({
      s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: (req, file, cb) => {
        cb(null, `previews/${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).fields([
    {name: 'preview', maxCount: 1},
    {name: 'movie', maxCount: 1},
  ]);

  async fileUpload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, err => {
        if (err) {
          throw new NotFoundException(`Failed to upload file: ${err}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (err) {
      return res.status(500).json({err});
    }
  }
}
