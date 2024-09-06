import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const authorizationHeader = req.get('Authorization');
    if (authorizationHeader) {
    const refreshToken = authorizationHeader.replace('Bearer', '').trim();
    return { ...payload, refreshToken };
    } else {
    // Handle the case where the 'Authorization' header is not present
    // For example, you could throw an error or return a default value
    throw new Error('Authorization header is missing');
    }
  }
}