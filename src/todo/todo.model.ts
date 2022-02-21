import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ITodo } from './todo.interfaces';
// export const todoSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   completed: Boolean,
//   createdAt: Date,
//   updatedAt: Date,
// }, { timestamps: true });


@Schema({ timestamps: true })
export class Todo extends mongoose.Document implements ITodo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  completed: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const todoSchema = SchemaFactory.createForClass(Todo);