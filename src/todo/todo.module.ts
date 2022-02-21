import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import {
  MongooseModule
} from '@nestjs/mongoose'
import { todoSchema } from './todo.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Todo',
      schema: todoSchema
    }])
  ],
  controllers: [TodoController],
  providers: [
    TodoService
  ],
})


export class TodoModule { }