// src/user/dto/update-user.dto.ts
export class UpdateUserDto {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password: string
    // Exclude password from UpdateUserDto; password changes are handled separately
}
