import {
  Controller,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignAuthDto } from './dto/sign-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { MyFirstPipe } from 'src/pipes/my-first-pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(MyFirstPipe)
  @Post('singup')
  async signup(@Body() signAuthDto: SignAuthDto) {
    return this.authService.singup(signAuthDto);
  }

  @Post('login')
  async login(@Body() loginCreds: LoginDto) {
    return this.authService.login(loginCreds);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

}
