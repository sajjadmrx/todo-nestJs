import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { TokenService } from "src/auth/token.service";

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {

  constructor(
    private readonly tokenService: TokenService
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;
    if (token) {
      try {
        const data = await this.tokenService.verifyToken(token)


        next();

      } catch (error) {
        throw new HttpException('Token is not provided', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Token is not provided', HttpStatus.UNAUTHORIZED);
    }

  }

}