import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common'
import { ITodo } from './todo.interfaces'
import { TodoService } from './todo.service'
import { createParamDecorator } from '@nestjs/common';
export const Userw = createParamDecorator((data, req) => req.user);
@Controller('todo')
export class TodoController {

  constructor(
    private readonly TodoService: TodoService
  ) { }

  @Get()
  async todos() {

    return await this.TodoService.getTodos()
  }

  @Get(':id')
  async getSingleTodo(@Param('id') id: string) {
    return await this.TodoService.getTodoById(id)
  }

  @Post()
  async createTodo(
    @Body() todo: ITodo
  ) {
    return await this.TodoService.createTodo(todo)
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return await this.TodoService.deleteTodo(id)
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body() todo: ITodo) {
    return await this.TodoService.updateTodo(id, todo)
  }

}