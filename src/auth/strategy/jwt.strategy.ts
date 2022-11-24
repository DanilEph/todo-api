import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as passport from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends passport.PassportStrategy(Strategy, 'jwt') {
  constructor(confing: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: confing.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    console.log({ payload });
    return payload;
  }
}