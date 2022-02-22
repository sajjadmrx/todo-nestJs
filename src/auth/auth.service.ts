import {
  UnauthorizedException, Injectable,
} from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository
  ) { }

  async register(username: string, password: string): Promise<any> {
    let user = await this.userRepository.findOne({ username });
    if (user)
      throw new UnauthorizedException('Username already exists');


    user = await this.userRepository.create({ username, password });
    return user;
  }


  async login(username: string, password: string): Promise<any> {
    let user = await this.userRepository.findOne({ username })
    if (!user)
      throw new UnauthorizedException('Invalid credentials');

    // check Hashed password

    if (user.password !== password)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }



  async logout(): Promise<any> { }


}