import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
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

  async create(todo: ITodo, user_id): Promise<Todo> {
    return this.todoModel.create({
      ...todo, user_id
    });
  }

  async deleteOne(TodoFilterQuery: FilterQuery<Todo>): Promise<boolean> {
    const deleteResult = await this.todoModel.deleteOne(TodoFilterQuery);
    return deleteResult.deletedCount > 0;
  }

  async updateWihtId(id: string, todo: ITodo): Promise<Todo> {
    let oldTodo = await this.todoModel.findOneAndUpdate({ todo_id: id }, {
      ...todo,
    })
    if (!oldTodo) {
      throw new NotFoundException(`Todo with id ${id} not found`)
    }
    oldTodo.set(todo);
    return oldTodo;

  }


}





// class x<T>{

// }

// const a = new x<String>()