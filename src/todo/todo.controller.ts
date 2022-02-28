import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { ITodo } from './todo.interfaces'
import { TodoService } from './todo.service'
import { createParamDecorator } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { getUser } from 'src/user/decorators/getUser.decorator';
import { IUser } from 'src/user/user.interface';
export const Userw = createParamDecorator((data, req) => req.user);
@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {

  constructor(
    private readonly TodoService: TodoService
  ) { }


  @Get()
  async todos(@getUser('user_id') user_id: string) {
    return await this.TodoService.getTodos(user_id)
  }

  @Get(':id')
  async getSingleTodo(@Param('id') id: string) {
    return await this.TodoService.getTodoById(id)
  }

  // @getUser decorator is property decorator which is non-sense here. Please read about Method Decorators and use general Auth Decorators that is mentioned in NEST.JS Website.
  // use guards in order to have authorization in addition to authentication.
  @Post()
  async createTodo(
    @Body() todo: ITodo,
    @getUser('user_id') user_id: string
  ) {
    return await this.TodoService.createTodo(todo, user_id)
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
