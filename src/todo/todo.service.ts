import { HttpCode, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Req, Res, Response } from '@nestjs/common'


import { ITodo } from './todo.interfaces';
import { Todo } from './todo.schema';
import { TodoRepository } from './todo.repository';
import { Request } from 'express';


@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository
  ) { }


  async getTodoById(id: string): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({
        todo_id: id
      })



      if (!todo)
        throw new NotFoundException(`Todo with id ${id} not found`)

      return todo
    } catch (error) {
      throw new InternalServerErrorException()
    }

  }

  async getTodos(userId: string): Promise<Todo[]> {
    return this.todoRepository.find({
      user_id: userId
    })
  }

  async createTodo(todo: ITodo, user_id: string): Promise<Todo> {
    return this.todoRepository.create(todo, user_id)
  }

  async deleteTodo(id: string): Promise<{}> {
    const deleted = await this.todoRepository.deleteOne({ todo_id: id })
    if (deleted) {
      return HttpStatus.OK
    } else {
      return HttpStatus.NOT_FOUND
    }

  }

  async updateTodo(id: string, todo: ITodo): Promise<Todo> {
    return this.todoRepository.updateWihtId(id, todo)
  }

}