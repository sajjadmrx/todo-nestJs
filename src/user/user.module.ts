import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { userSchema } from './user.schema';
import { UserService } from './user.service';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: userSchema
    }])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    UserRepository
  ],
  exports: [
    UserService,
    UserRepository,
  ]
})
export class UserModule {

}
