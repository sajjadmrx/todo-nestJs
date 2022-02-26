import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { AuthDto } from "./dto";

import { UserService } from "src/user/user.service";




@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  async signinLocal(authDto: AuthDto): Promise<any> {
    const user = await this.userService.findOneWithUsername(authDto.username);
    if (!user)
      throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatched = await bcrypt.compare(authDto.password, user.password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid credentials');


    return this.signUser(user.user_id);
  }


  async singupLocal(authDto: AuthDto): Promise<any> {
    const user = await this.userService.findOneWithUsername(authDto.username);
    if (user)
      throw new UnauthorizedException('User already exists');

    const hashedPassword = await bcrypt.hash(authDto.password, 10);


    const newUser = await this.userService.create({ username: authDto.username, password: hashedPassword });

    return this.signUser(newUser.user_id);

  }

  signUser(userId: string): object {
    return {
      access_token: this.jwtService.sign({ userId })
    }
  }

}