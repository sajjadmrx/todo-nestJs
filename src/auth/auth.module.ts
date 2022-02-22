import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";

import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "User",
        schema: User
      }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    UserRepository,
    TokenService,
    AuthService,
  ],
})
export class AuthModule { }