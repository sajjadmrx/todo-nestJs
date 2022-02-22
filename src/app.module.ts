import {
  Module
} from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';

import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/todo-nestjs', {}),
    TodoModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }