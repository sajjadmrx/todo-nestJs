import { Injectable } from '@nestjs/common'
import { ITodo } from './todo.interfaces';
import { Todo } from './todo.model';
import { TodoRepository } from './todo.repository';


@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository
  ) { }


  async getTodoById(id: string): Promise<Todo> {
    return this.todoRepository.findOne({
      todo_id: id
    })
  }

  async getTodos(): Promise<Todo[]> {
    return this.todoRepository.find()
  }

  async createTodo(todo: ITodo): Promise<Todo> {
    return this.todoRepository.create(todo)
  }

}