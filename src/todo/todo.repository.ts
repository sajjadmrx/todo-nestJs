import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.model';
import { Model, FilterQuery } from 'mongoose';
import { ITodo } from './todo.interfaces';


@Injectable()

export class TodoRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) { }


  async findOne(TodoFilterQuery: FilterQuery<Todo>): Promise<Todo> {
    return this.todoModel.findOne(TodoFilterQuery);
  }

  async find(TodoFilterQuery?: FilterQuery<Todo>): Promise<Todo[]> {
    return this.todoModel.find(TodoFilterQuery);
  }

  async create(todo: ITodo): Promise<Todo> {
    return this.todoModel.create(todo);
  }


}





// class x<T>{

// }

// const a = new x<String>()