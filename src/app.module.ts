import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { MovieModule } from './movie/movie.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseConfig } from './database.config';
import { config } from './config';
import { FilesModule } from './files/files.module';
import { ActorsModule } from './actors/actors.module';
import { DirectorsModule } from './directors/directors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    MovieModule,
    SharedModule,
    FilesModule,
    ActorsModule,
    DirectorsModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
