// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }

    @Get(':id')
    getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getUser(id);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
