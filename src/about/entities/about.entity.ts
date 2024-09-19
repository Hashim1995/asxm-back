import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class About {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ name: 'title' })
    @ApiProperty()
    title: string;

    @Column({ name: 'description' })
    @ApiProperty()
    description: string;
}
