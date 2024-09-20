// src/auth/auth.controller.ts
import { Controller, Patch, Body, UseGuards, Req, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Patch('change-password')
    async changePassword(
        @Req() req,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const userId = req.user.id; // Assumes user ID is attached to the request object
        const { oldPassword, newPassword } = changePasswordDto;
        await this.authService.changePassword(userId, oldPassword, newPassword);
    }

    @Public()
    @Post('signin')
    async signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
        return this.authService.signIn(signInDto);
    }
}
