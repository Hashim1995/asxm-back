// src/auth/auth.controller.ts
import { Controller, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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
}
