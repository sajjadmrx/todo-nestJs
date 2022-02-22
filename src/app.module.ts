import {
  MiddlewareConsumer,
  Module, NestModule
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { TokenService } from './auth/token.service';
import { CheckTokenMiddleware } from './middlewares/auth.middleware';

import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/todo-nestjs', {}),
    TodoModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    TokenService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .forRoutes('user')
  }

}