import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class UserRepository {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async findOne(UserFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(UserFilterQuery);
  }

  async find(UserFilterQuery?: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(UserFilterQuery);
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async deleteOne(UserFilterQuery: FilterQuery<User>): Promise<boolean> {
    const deleteResult = await this.userModel.deleteOne(UserFilterQuery);
    return deleteResult.deletedCount > 0;
  }


}