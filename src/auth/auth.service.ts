// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async changePassword(
        userId: number,
        oldPassword: string,
        newPassword: string,
    ): Promise<void> {
        const user = await this.userService.getUser(userId);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Old password is incorrect');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await this.userService.updateUser(userId, { password: hashedPassword });
    }


    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
        const { username, password } = signInDto;
        const user = await this.userService.findByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Create the payload for the JWT
        const payload = { username: user.username, sub: user.id };

        // Return the signed JWT
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Add changePassword function as described previously
}
