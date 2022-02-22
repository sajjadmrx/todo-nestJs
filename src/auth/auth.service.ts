import {
  UnauthorizedException, Injectable,
} from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";


import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository
  ) { }

  async register(username: string, password: string): Promise<any> {
    let user = await this.userRepository.findOne({ username });
    if (user)
      throw new UnauthorizedException('Username already exists');

    let passHashid = await bcrypt.hash(password, 10);
    user = await this.userRepository.create({ username, password: passHashid });

    //return Token
    return user;
  }


  async login(username: string, password: string): Promise<any> {
    let user = await this.userRepository.findOne({ username })
    if (!user)
      throw new UnauthorizedException('Invalid credentials');

    // check Hashed password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      throw new UnauthorizedException('Invalid credentials');


    // return Token
    return user;
  }



  async logout(): Promise<any> { }


}