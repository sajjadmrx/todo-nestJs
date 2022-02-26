import {
  MiddlewareConsumer,
  Module, NestModule
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose'
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

  ],
  providers: [],
})
export class AppModule {

}