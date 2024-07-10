import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './entities/refresh-token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
