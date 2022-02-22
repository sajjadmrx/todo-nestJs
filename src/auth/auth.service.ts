import {
  UnauthorizedException, Injectable,
} from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";


import * as bcrypt from "bcryptjs";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService
  ) { }

  async register(username: string, password: string): Promise<any> {
    let user = await this.userRepository.findOne({ username });
    if (user)
      throw new UnauthorizedException('Username already exists');

    let passHashid = await bcrypt.hash(password, 10);
    user = await this.userRepository.create({ username, password: passHashid });




    const token = await this.tokenService.createToken({ userId: user.user_id }, {
      expiresIn: '1h',
    })

    return {
      token
    }

  }


  async login(username: string, password: string): Promise<any> {
    let user = await this.userRepository.findOne({ username })
    if (!user)
      throw new UnauthorizedException('Invalid credentials');

    // check Hashed password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      throw new UnauthorizedException('Invalid credentials');


    const token = await this.tokenService.createToken({ userId: user.user_id }, {
      expiresIn: '1h',
    })

    return {
      token
    }
  }



  async logout(): Promise<any> { }


}