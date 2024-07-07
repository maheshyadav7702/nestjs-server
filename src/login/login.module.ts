import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema } from './schemas/login.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:'Login', schema:LoginSchema
  }])],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
