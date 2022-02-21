import {
  Module
} from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose'

import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb://localhost/todo-nestjs', {})
  ],
})
export class AppModule { }