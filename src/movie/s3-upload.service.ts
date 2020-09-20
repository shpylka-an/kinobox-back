import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import { MovieService } from './movie.service';
import { UpdateMovieFilesDto } from './dto/update-movie-files.dto';

@Injectable()
export class S3UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly movieService: MovieService,
  ) {
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

  private uploadToS3(
    @Req() req,
    @Res() res,
  ): Promise<{ previewUrl: string; videoUrl: string }> {
    return new Promise((resolve, reject) => {
      this.upload(req, res, err => {
        if (err) {
          reject(err);
        } else {
          const previewUrl = req.files.preview[0].location;
          const videoUrl = req.files.movie[0].location;
          resolve({ previewUrl, videoUrl });
        }
      });
    });
  }

  async fileUpload(
    @Req() req,
    @Res() res,
    id: number,
  ): Promise<UpdateMovieFilesDto> {
    const { previewUrl, videoUrl } = await this.uploadToS3(req, res);
    await this.movieService.updateFiles({ id, previewUrl, videoUrl });
    return { id, previewUrl, videoUrl };
  }
}
