import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { ITodo } from './todo.interfaces'
import { TodoService } from './todo.service'
import { createParamDecorator } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { getUser } from 'src/user/decorators/getUser.decorator';
import { IUser } from 'src/user/user.interface';
export const Userw = createParamDecorator((data, req) => req.user);
@Controller('todo')
export class TodoController {

  constructor(
    private readonly TodoService: TodoService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async todos(@getUser() user: IUser) {
    return user.username
    //  return await this.TodoService.getTodos(req.user)
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