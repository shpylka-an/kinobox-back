export const configuration = () => {
  let database;
  if (process.env.NODE_ENV === 'test') {
    database = {
      host: process.env.TEST_DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_DATABASE,
    };
  } else {
    database = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };
  }

  return {
    port: Number(process.env.PORT),
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
    awsAccessKetId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    database: {
      type: 'postgres',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      keepConnectionAlive: true,
      ...database,
    },
  };
};
