import { Body, Controller, Get, Post } from '@nestjs/common'
import { ITodo } from './todo.interfaces'
import { TodoService } from './todo.service'


@Controller('todo')
export class TodoController {

  constructor(
    private readonly TodoService: TodoService
  ) { }

  @Get()
  async todos() {
    return await this.TodoService.getTodos()
  }

  @Post()
  async createTodo(
    @Body() todo: ITodo
  ) {
    return await this.TodoService.createTodo(todo)
  }

}