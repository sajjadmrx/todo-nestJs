import { Injectable } from "@nestjs/common";
import { IUser } from "./user.interface";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService {


  constructor(private readonly userRepository: UserRepository) { }

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  async findOneWithUserId(userId: string): Promise<IUser> {
    return this.userRepository.findOne({ userId });
  }

  async findOneWithUsername(username: string): Promise<IUser> {
    return this.userRepository.findOne({ username });
  }

  async create(user: any): Promise<IUser> {
    return this.userRepository.create(user);
  }

}