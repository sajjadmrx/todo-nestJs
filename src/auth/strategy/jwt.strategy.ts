import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from "src/user/user.interface";
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";
import jwtConstants from "../constants/jwt.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }


  async validate(payload: any): Promise<IUser> {
    const user = await this.userService.findOneWithUserId(payload.userId)
    if (!user)
      throw new UnauthorizedException('Invalid credentials')
    return user;
  }

}