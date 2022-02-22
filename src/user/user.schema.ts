import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { IUser } from './user.interface';


@Schema({ timestamps: true })
export class User extends mongoose.Document implements IUser {

  @Prop({
    default: Math.random().toString().substring(2)
  })
  user_id: string;

  @Prop({
    unique: true
  })
  username: string;

  @Prop()
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);