import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwtPayload.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private async getPasswordHash(password: string) {
    const saltRound = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRound);
      return hashedPassword;
    } catch (error) {
      console.error(error);
    }
  }

  private async checkIfPasswordValid(password: string, hash: string) {
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
  }

  private async getToken(userId: string, login: string) {
    const payload: JwtPayload = {
      sub: userId,
      login,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5h',
      secret,
    });

    return {
      access_token: token,
    };
  }

  async signin(dto: AuthDto) {
    try {
      const user = await this.UserModel.findOne({ login: dto.login });
      if (!user) throw new Error('Not found user with such login in database!');
      const isPasswordValid = await this.checkIfPasswordValid(
        dto.password,
        user.password,
      );
      if (!isPasswordValid) throw new Error('Password is not correct');
      return this.getToken(user.id, user.login);
    } catch (error) {
      console.log(error);
    }
  }

  async signup(dto: AuthDto) {
    const newUser = new this.UserModel({
      login: dto.login,
      password: await this.getPasswordHash(dto.password),
    });

    try {
      const user = await newUser.save();
      console.log('New user has been added to database!');
      return this.getToken(user.id, user.login);
    } catch (error) {
      console.log(error);
    }
  }
}