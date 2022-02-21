import { Controller, Get } from '@nestjs/common'
import { TodoService } from './todo.service'


@Controller('todo')
export class TodoController {

  constructor(
    private readonly TodoService: TodoService
  ) { }

  @Get()
  todos() {
    return []
  }


}