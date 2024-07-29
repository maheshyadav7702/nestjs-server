import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignAuthDto } from './dto/sign-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async singup(signAuthDto: SignAuthDto) {
    const { name, email, password } = signAuthDto;

    // Check if the email exists
    const emailInUse = await this.authModel.findOne({ email });
    if (emailInUse) {
      throw new Error('Email already in use');
    }

    // Create the user
    const user = new this.authModel({ name, email, password });
    await user.save();
  }

  async login(loginCreds: LoginDto) {
    const { email, password } = loginCreds;

    // Check if the email exists
    const user = await this.authModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      throw new UnauthorizedException('Invalid email address');
    }

    // Check if the password is correct
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.genarateUserToken(user._id);
    return {
      ...token,
      userId: user._id,
    };
  }

  async refreshToken(refreshToken: string) {
    // Check if the refresh token exists
    const token = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.genarateUserToken(token.userId);
  }

  async genarateUserToken(userId: any) {
    const access_token = this.jwtService.sign({ userId }, { expiresIn: '60m' });
    const refresh_token = uuidv4();
    await this.storeRefreshToken(refresh_token, userId);
    return {
      access_token,
      refresh_token,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.refreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true },
    );
  }
}
