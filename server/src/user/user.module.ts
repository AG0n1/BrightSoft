import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {UploadController, UserController} from './user.controller';

@Module({
  controllers: [UserController, UploadController],
  providers: [UserService],
})
export class UserModule {}
