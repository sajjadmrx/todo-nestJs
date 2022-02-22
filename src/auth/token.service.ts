import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from '@nestjs/jwt';


@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService
  ) { }

  async createToken<T extends object>(data: T, options?: JwtSignOptions): Promise<string> {
    const accessToken = await this.jwtService.signAsync(data, options);
    return accessToken;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const data = await this.jwtService.verifyAsync(token);
      return data;
    } catch (error) {
      return null;
    }
  }

}