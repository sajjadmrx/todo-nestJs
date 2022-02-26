import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService {


  constructor(private readonly userRepository: UserRepository) { }

  async findAll(): Promise<any> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<any> {
    return await this.userRepository.findOne({ username });
  }

}