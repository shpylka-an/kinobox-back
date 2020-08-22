import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3UploadService {
  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  private upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      acl: 'public-read',
      key: (req, file, cb) => {
        const folder = `${file.fieldname}s`;
        cb(null, `${folder}/${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).fields([
    { name: 'preview', maxCount: 1 },
    { name: 'movie', maxCount: 1 },
  ]);

  async fileUpload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, err => {
        if (err) {
          throw new NotFoundException(`Failed to upload file: ${err}`);
        }
        return res.status(201).json({ message: 'Uploaded' });
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
