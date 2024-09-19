import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(About)
        private aboutRepository: Repository<About>,
    ) { }

    create(createAboutDto: CreateAboutDto): Promise<About> {
        const about = this.aboutRepository.create(createAboutDto);
        return this.aboutRepository.save(about);
    }

    async findAll(): Promise<About[]> {
        return await this.aboutRepository.find();

    }

    findOne(id: number): Promise<About> {
        return this.aboutRepository.findOneBy({ id });
    }

    async update(id: number, updateAboutDto: UpdateAboutDto): Promise<About> {
        await this.aboutRepository.update(id, updateAboutDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.aboutRepository.delete(id);
    }
}
