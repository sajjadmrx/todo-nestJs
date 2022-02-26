import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import jwtConstants from "./constants/jwt.constant";
import { JwtStrategy } from "./strategy/jwt.strategy";
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions,
    }),
    UserModule,
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService, JwtStrategy
  ],
  exports: [],
})
export class AuthModule { }