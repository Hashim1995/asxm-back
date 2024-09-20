import { ApiProperty } from "@nestjs/swagger";

// src/user/dto/update-user.dto.ts
export class UpdateUserDto {
    @ApiProperty()
    username?: string;
    @ApiProperty()
    firstName?: string;
    @ApiProperty()
    lastName?: string;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    password: string
    // Exclude password from UpdateUserDto; password changes are handled separately
}
