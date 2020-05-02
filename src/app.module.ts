import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, MovieModule],
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
