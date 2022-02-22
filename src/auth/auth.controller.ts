import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')

export class AuthController {


  constructor(
    private authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() body: any) {
    const { username, password } = body;
    return await this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;
    return await this.authService.login(username, password);
  }

}