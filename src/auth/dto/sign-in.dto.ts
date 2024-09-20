import { ApiProperty } from "@nestjs/swagger";

// src/auth/dto/sign-in.dto.ts
export class SignInDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}
