// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,  // Inject the repository
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...userData } = createUserDto;

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user object with the hashed password
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        // Save the user to the database
        return this.userRepository.save(user);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto.password) {
            // Hash the password if it's being updated
            const salt = await bcrypt.genSalt();
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
        }
        await this.userRepository.update(id, updateUserDto);
        return this.getUser(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async getUser(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    // New method to find user by username
    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }
}
