import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "User",
        schema: User
      }
    ])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    UserRepository,
  ],
})
export class AuthModule { }