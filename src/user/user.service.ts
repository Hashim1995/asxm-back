// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return this.getUser(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async getUser(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
