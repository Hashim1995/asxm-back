// src/auth/jwt.strategy.ts
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'yourJWTSecretKey', // Use environment variables for secrets
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}
